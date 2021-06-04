export default class{
    dateToDMY (value)
    {
        var d = new Date(value);
        var r = d.getDate() + "-" + (d.getMonth() + 1) + "-" + d.getFullYear();
        return r;
    }   
}