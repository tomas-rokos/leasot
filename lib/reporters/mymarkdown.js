module.exports = function (todos) {
    var kws = [];
    todos.forEach(function (todo) {
        var parts = todo["text"].split(" ");
        todo["kws"] = [];
        parts.forEach(function (part) {
           if (part[0] == "#" || part[0] == "@") {
               todo["kws"].push(part);
               if (kws.indexOf(part) === -1)
                   kws.push(part);
           }
        });
    });
    var result = "";
    kws.forEach(function (kw) {
       result += mymd_dumpKW(todos,kw);
    });
    result += mymd_dumpKW(todos,null);
    return result;
};

function mymd_dumpKW(todos,kw) {
    var result = "";
    var first = true;
    todos.forEach(function (todo) {
        if (kw != null && todo["kws"].indexOf(kw) === -1)
            return;
        if (kw == null && todo["kws"].length != 0)
            return;
        if (first) {
            result += "### "+kw+"\n|text|location|\n|---|---|\n";
            first = false;
        }
        result += "| "+todo["text"]+" | "+todo["file"]+":"+todo["line"]+"\n";
    });
    return result;
}
