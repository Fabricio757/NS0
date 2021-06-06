const Sqlite = require("nativescript-sqlite");
const fs = require("tns-core-modules/file-system");

export default class{


    constructor(base, usuarioLogueado) {
      
      if(base == "products.db"){

        if (!Sqlite.exists("products.db")) {
          try{
          console.log("no existe products");
          Sqlite.copyDatabase("products.db");          
          console.log("products copiado");
          }
          catch(error){
            console.log(error);
          }
        }else{
          console.log("Existe Products!");
        }

        (new Sqlite("products.db")).then(db => {
            this.db = db;
            db.resultType(Sqlite.RESULTSASOBJECT);
        }, error => {
            console.log("OPEN DB ERROR", error);
        });

        
      }


      if(base == "my.db"){
        (new Sqlite("my.db")).then(db => {
              this.db = db;
              //db.execSQL("DROP TABLE people");
              db.resultType(Sqlite.RESULTSASOBJECT);
              db.execSQL("CREATE TABLE IF NOT EXISTS people (id INTEGER PRIMARY KEY AUTOINCREMENT, firstname TEXT, lastname TEXT, birthday DATETIME)").then(id => {
              console.log("TABLE CREATED");
              }, error => {
                  console.log("CREATE TABLE ERROR", error);
              });
          }, error => {
              console.log("OPEN DB ERROR", error);
          });
      }

      this.BaseDatos = base;
      this.operaciones = [];
      this.UsuarioLogueado = usuarioLogueado;
    }

    // insert(){
    //   this.db.execSQL("INSERT INTO people (firstname, lastname) VALUES (?, ?)", ["Fabricio", "Antonini"]).then(id => {
    //     console.log("registro insertado");
    //   }, error => {
    //       console.log("INSERT ERROR", error);
    //   })
    // }

    // async get(){
    //   try{
    //       const result = await this.db.all("SELECT firstname as firstname, lastname as lastname FROM people", []);
    //       return result;
    //   }
    //   catch(error){
    //       return {"message": "login failed", "error": "true"};
    //   }
    // }


    addOperacion (operacion, tabla, args)
    {
      let item = [operacion, tabla, args];
      this.operaciones.push(item);
    }
    addOperacionProcedure (operacion, procedureName, args)
    {
      let item = [operacion, procedureName, args];
      this.operaciones.push(item);
    }
    resetOperaciones()
    {
      this.operaciones = [];
    }
    prepareBody()
    {   
  
      //var body = {"Input": "{'BaseDatos': 'TestDB','Operaciones':[{'Op': 'Seleccion','tabla':'Aves','args':[{'id':'1'}]}]}"};
  
        var bodyOp = "{'BaseDatos': "+ this.BaseDatos +", 'Operaciones':[";
          for(var i = 0; i < this.operaciones.length; i++){
            var item = this.operaciones[i];
            if(item[2]  == null){
              bodyOp += "{'Op': '" + item[0] + "', "+ (item[0] === "Procedure" ? 'procedureName' : 'tabla' ) + ": '" + item[1] + "' }";
            }
            else{
              bodyOp += "{'Op': '" + item[0] + "', "+ (item[0] === "Procedure" ? 'procedureName' : 'tabla' ) + ": '" + item[1] + "', 'args': " + item[2] + " }";
            }
            
          }
        bodyOp += "]}";  
  
        var body =  { Input: bodyOp};
  
        return body;
    }
  
    async execute (usuarioLogueado)
    {
      this.usuarioLogueado = usuarioLogueado;
      
      var args = [];
      try{
            if(this.usuarioLogueado)
            {
              for(var i = 0; i < this.operaciones.length; i++){
                var operacion = this.operaciones[i];
                var args = [];
                var argsValues = [];
                var argsKeys = [];
                var argsKeysValues = [];

                if(operacion[2].length > 0){
                   var arguments2 = JSON.parse(operacion[2]);
                   console.log(arguments2);
                  for(var a = 0; a < arguments2.length; a++){
                    var keysbyindex = Object.keys(arguments2[a]);
                    var nameArg = keysbyindex[0];
                    
                    if(keysbyindex[1].toUpperCase() === "KEY"){
                      argsKeys.push(nameArg);
                      argsKeysValues.push(arguments2[a][nameArg]);
                    }
                    else{
                      args.push(nameArg);
                      argsValues.push(arguments2[a][nameArg]);
                    }
                  }
                }

                var qry = "";
                switch (operacion[0]) {
                  case "Seleccion": {
                    qry = "SELECT * FROM " + operacion[1];
                    if(args.length > 0){
                      qry += " WHERE ";
                      for(var p = 0; p < args.length; p++){
                        qry += (p == 0 ? "" : " and ") + args[p] + " = :" + args[p] + " "; 
                      }
                    }
                    break;
                  }
                  case "Insert": {
                    var t = "?,".repeat(args.length);
                    t = t.slice(0,t.length-1);
                    t = "(" + t + ")";
                    qry = "INSERT INTO " + operacion[1] + "(" + args.join(",") + ") VALUES " + t;
                    break;
                  }
                  case "Delete": {
                    qry = "DELETE FROM " + operacion[1];
                    if(args.length > 0){
                      qry += " WHERE ";
                      for(var p = 0; p < args.length; p++){
                        qry += (p == 0 ? "" : " and ") + args[p] + " = :" + args[p] + " "; 
                      }
                    }                    
                    break;
                  }
                  case "Update": {
                    qry = "UPDATE " + operacion[1] + " SET ";
                    var qrySet = "";
                    var qryWhere = "";
                    if(args.length > 0){
                      for(var p = 0; p < args.length; p++){
                          qrySet += (qrySet === "" ? "" : " , ") + args[p] + " = :" + args[p] + " "; 
                      }
                      for(var p = 0; p < argsKeys.length; p++){
                          qryWhere += (qryWhere === "" ? "" : " , ") + argsKeys[p] + " = :" + argsKeys[p] + " "; 
                          argsValues.push(argsKeysValues[p]);
                      }

                    }   
                    qry += qrySet + " WHERE " + qryWhere;
                    break;
                  }
                  default: {
                    break;
                  }
                }

                const result = await this.db.all(qry, argsValues);
                var R = "R" + (i+1).toString();
                var st = '[{ \"'+ R +'\":'+ JSON.stringify(result) +'}]';
                var resultados = JSON.parse(st);
              }


              
              var resultado = {"resultados": resultados, "error": "false" };
              console.log(resultado);
              return resultado; 
            } else 
            {
                return {"message": "login failed", "error": "true"};
            }
         }
      catch(error)
      {      
        return {"message": "\"" + error.message + "\"", "error": "true"};
      }
    }

    async executeQuery (usuarioLogueado, qry, argsValues)
    {
      try{
        if(usuarioLogueado)
        {
          const result = await this.db.all(qry, argsValues);
          var st = '[{ \"R1\":'+ JSON.stringify(result) +'}]';
          var resultados = JSON.parse(st);

          var resultado = {"resultados": resultados, "error": "false" };
          console.log(resultado);
          return resultado; 
        } else 
        {
            return {"message": "login failed", "error": "true"};
        }
      }
      catch(error){
        return {"message": "\"" + error.message + "\"", "error": "true"};
      }
    }

  };
  
