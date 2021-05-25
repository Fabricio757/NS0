export default class{


    constructor(base, usuarioLogueado, end_point) {
      this.BaseDatos = base;
      this.operaciones = [];
      this.UsuarioLogueado = usuarioLogueado;
      this.end_point = end_point;
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
  
        var bodyOp = "{'BaseDatos': 'TestDB', 'Operaciones':[";
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
  
    async execute (usuarioLogueado, end_point)
    {
      this.usuarioLogueado = usuarioLogueado;
      this.end_point = end_point;
      
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
        args.push({'error': error.message});
        return {"message": JSON.stringify(args), "error": "true"};
      }
    }
  };
  
