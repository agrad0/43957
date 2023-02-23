const fs = require('fs');
const path = require('path');
const saveData = require('./users-sorting')

saveData('./data_source/users-store.json', 'sorted', process.argv[2])