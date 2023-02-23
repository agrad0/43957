const fs = require('fs');
const path = require('path');

function saveData(url, folderName, overwrite) {
    console.log(url, folderName, overwrite)
    fs.mkdir(path.join(__dirname, folderName), function (err) {
        if ((err) && (overwrite === false)) {
            if (err.code === 'EEXIST')  {
                console.log('Folder juz istnieje i nie zezwolono na nadpisanie');
            }
            console.log(err);
        } else {
            console.log('Stworzono folder lub zezwolono na nadpisanie');
            fs.readFile(url, 'utf8', function (err, data) {
                if (err) {
                    console.log(err);
                } else {
                    let usersData = JSON.parse(data);

                    for (let key of usersData) {
                        fs.writeFile(path.join(__dirname, folderName, `${key.id}` + '-' + `${key.name}`.split(' ')[0] + '-' + `${key.name}`.split(' ')[1] ),
                        'Name: ' + `${key.name.split(' ')[0]}` +
                        '\n Surname: ' + `${key.name.split(' ')[1]}` + 
                        '\n Street: ' + `${key.address.street}` +
                        '\n Zip Code: ' + `${key.address.zipcode}` +
                        '\n City: ' + `${key.address.city}` +
                        '\n Phone: ' + `${key.phone.split(' ')[0]}`
                        ,
                          function (err) {
                            if(err) {
                                console.log(err);
                            } else {
                                console.log('Stworzono plik');
                            }
                        });
                    }
                }
            })
        }
    })
}

// saveData('./data_source/users-store.json', 'sorted', false)

module.exports = saveData;