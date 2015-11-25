function tmpl(tmpl, o) {
    return tmpl.replace(/<%=(?:\s*)(.*?)(?:\s*)%>/g, function (item, param) {
        var isProperty, propertyList, temptObj;
        if (param.split(".").length > 1) {
            propertyList = param.split(".");
            propertyList.forEach(function (item, index){
                if (!!!index) {
                    temptObj = o[item];
                } else {
                    temptObj = temptObj[item];
                }
            });

            return temptObj;
        }
        return o[param];
    });
}
