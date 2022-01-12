
function WhitelistDictionary() {


    const whitelist_old = ["0x4b32038CD6D1cDEE6Cd9357b8A2Ec6E4eC77eEef"]
    const whitelist = whitelist_old
    var wlDict = {}

    for (var i = 0; i < whitelist.length; i++) {
        wlDict[whitelist[i].toLocaleLowerCase()] = true;
    }
    return wlDict
}

export default WhitelistDictionary;