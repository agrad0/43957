const fs = require('fs');
const path = require('path');
const EventEmitter = require('events');

class TxtMessage extends EventEmitter {
    constructor(msg) {
        super();
    }

    showMsg (msg) {
        this.emit('getMessage', msg)
    }

}

function saveData(url, folderName, overwrite) {
    let txtMessage = new TxtMessage('');
    let overwriteBoolean = false;
    if (overwrite === "true") {
        overwriteBoolean = true;
    }
    // console.log(url, folderName, overwrite);
    txtMessage.on('getMessage', showMessage)
    fs.mkdir(path.join(__dirname, folderName), function (err) {
        if ((err) && (overwriteBoolean === false)) {
            if (err.code === 'EEXIST')  {
                txtMessage.showMsg('Folder juz istnieje i nie zezwolono na nadpisanie');
            }
            txtMessage.showMsg(err);
        } else {
            txtMessage.showMsg('Stworzono folder lub zezwolono na nadpisanie');
            fs.readFile(url, 'utf8', function (err, data) {
                if (err) {
                    txtMessage.showMsg(err);
                } else {
                    let usersData = JSON.parse(data);

                    for (let key of usersData) {
                        fs.writeFile(path.join(__dirname, folderName, `${key.id}` + '-' + `${key.name}`.split(' ')[0] + '-' + `${key.name}`.split(' ')[1] ),
                        'Name: ' + `${key.name.split(' ')[0]}` +
                        '\nSurname: ' + `${key.name.split(' ')[1]}` + 
                        '\nStreet: ' + `${key.address.street}` +
                        '\nZip Code: ' + `${key.address.zipcode}` +
                        '\nCity: ' + `${key.address.city}` +
                        '\nPhone: ' + `${key.phone.split(' ')[0]}`
                        ,
                          function (err) {
                            if(err) {
                                txtMessage.showMsg(err);
                            } else {
                                txtMessage.showMsg('Stworzono plik');
                            }
                        });
                    }
                }
            })
        }
    })
}

function showMessage(message) {
    console.log(`Konsola nadaje komunika: ${message}`);
}


// saveData('./data_source/users-store.json', 'sorted', false)

module.exports = saveData;