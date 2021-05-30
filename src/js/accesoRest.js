export default class{


    constructor(base, usuarioLogueado) {
      this.end_point = "http://192.168.0.6:8082/";
      this.BaseDatos = base;
      this.operaciones = [];
      this.UsuarioLogueado = usuarioLogueado;
    }
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
                var inputText = this.prepareBody(inputText);
                let myvalue =JSON.stringify(inputText);
  
                const requestOptions = {
                    method: 'POST',
                    headers: {
                                'Authorization': 'Bearer ' + this.usuarioLogueado.token,
                                'Content-Type' : 'application/json'
                            },
                    body: myvalue
                };
                console.log(this.end_point);
                const response = await fetch(this.end_point + "Db/Input", requestOptions);
                if(response.status !== 200)
                {
                  args.push({'error': response.statusText});
                  return {"message": response.statusText, "error": "true"};
                }
                const json = await response.json();
                return json;
              
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
  };
  
