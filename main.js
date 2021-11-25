function MyFunction() { // Create Spreadsheet
    var spreadsheet = SpreadsheetApp.create('Result'); // Result Spreadsheet name: Result
    var sheet = spreadsheet.getSheets()[0];

    var listName = ["Name 1", "Name 2", "Name 3"];

    var noPosition = 1;
    for (var j = 0; j < listName.length; j++) {
        if (listName[j].split(" ").length > 1) {
            Logger.log(listName[j]);
            // Please enter your search term in the place of Letter
            var searchFor = 'title contains "' + listName[j] + '"';
            var files = DriveApp.searchFiles(searchFor);
            var valuesToSheet = []; // Added

            while (files.hasNext()) {
                var file = files.next();
                var fileId = file.getId(); // To get FileId of the file
                var name = file.getName();

                if (name.includes("Commitment")) { // Change to filter you want
                    Logger.log(listName[j] + " - " + name);
                    var urlFileDownload = fileId != '' ? "https://drive.google.com/uc?export=download&id=" + fileId : '';
                    valuesToSheet.push([listName[j], name, urlFileDownload]);
                    sheet.getRange(noPosition, 1, valuesToSheet.length, valuesToSheet[0].length).setValues(valuesToSheet);
                    noPosition++;
                }
            }
        }
    }
}
