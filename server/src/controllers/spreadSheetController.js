const spreadSheetConfig = require("../config/spreadSheetConfig");

function calculateAverageGrade(p1, p2, p3){
    let averageGrade = (((p1 + p2 + p3) / 3) / 10);
    return parseFloat(averageGrade.toFixed(1));
}

// calculates each students situation
function calculateStudentSituation(studentsData){
    const [classesFouls, p1, p2, p3] = studentsData;

    let average = calculateAverageGrade(p1, p2, p3);
    let situation;
    let passingGrade = 0;

    if (classesFouls > 15){
        situation = "Reprovado por Falta";
    } else {
        if (average < 5) {
            situation = "Reprovado por Nota";
        } else if (average < 7){
            situation = "Exame Final";

            passingGrade = (10 - average).toFixed(1);
        } else {
            situation = "Aprovado";
        }
    }

    return [situation, passingGrade];
}

class SpreadSheetController {
    // Takes the information from the students and enters the result into the spreadsheet
    static async modify(){
        const studentData = await this.getStudentsData();
        await this.insertRows(studentData);
    }

    // Receives an array with the situation and passing grade from the students and enters the information into the spreadsheet
    static async insertRows(studentsValues){
        const { googleSheets, auth, spreadsheetId } = await spreadSheetConfig();

        // Calculates the number of the last row, with data, in the spreadsheet 
        const lastRowSpreadSheet = studentsValues.length + 3; 

        const sheetRange = "engenharia_de_software!G4:H" + lastRowSpreadSheet.toString();

        try{
            await googleSheets.spreadsheets.values.update({
                auth, 
                spreadsheetId,
                range: sheetRange,
                valueInputOption: "USER_ENTERED",
                resource: { values: studentsValues }
            });

            return "Modificação realizada com sucesso!";
        } catch (error){
            throw new Error(`Error entering information: ${error.message}`);
        }
    }

    // Get the number of absences and grades for each student in the spreadsheet and returns an array with the situation and passing grade from the students
    static async getStudentsData(){
        const { googleSheets, auth, spreadsheetId } = await spreadSheetConfig();

        try{
            const rows = await googleSheets.spreadsheets.values.get({
                auth, 
                spreadsheetId,
                range: "engenharia_de_software!C:F",
                valueRenderOption: "UNFORMATTED_VALUE" 
            });

            // Generates an array only with necessary information
            const values = rows.data.values.slice(3);
            const studentsValues = values.filter(values => values.length);
    
            const studentsSituation = studentsValues.map(values => { return calculateStudentSituation(values); });

            return studentsSituation;
        } catch (error){
            throw new Error(`Error returning information: ${error.message}`);
        }
    }
}


module.exports = SpreadSheetController;
