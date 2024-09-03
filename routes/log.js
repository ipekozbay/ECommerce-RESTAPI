const express = require('express');
const router = express.Router();
const fs = require('fs');

router.get('/', (req, res) => {
    const { startDate, startTime, endDate, endTime } = req.query;

    if (!startDate || !startTime || !endDate || !endTime) {
        return res.status(400).send('Başlangıç ve bitiş tarihleri ile saatleri gereklidir.');
    }

    const startDateTimeStr = `${startDate}T${startTime.replace(',', '.')}`;
    const endDateTimeStr = `${endDate}T${endTime.replace(',', '.')}`; 

    const startDateTime = new Date(startDateTimeStr);  
    const endDateTime = new Date(endDateTimeStr);   
    const logFilePath = "/home/sysadmin/http_log/bank.log"
    fs.readFile(logFilePath, 'utf8', (err, data) => {
        if (err) {
            return res.status(500).send('Log dosyası okunamadı.');
        }

        const logs = data.split('\n').filter(line => {
            const match = line.match(/(\d{4}-\d{2}-\d{2}) (\d{2}:\d{2}:\d{2}),(\d{3})/);
            if (!match) return false;

            const logDateStr = `${match[1]}T${match[2]}.${match[3]}`; 
            const logDateTime = new Date(logDateStr);

            return logDateTime >= startDateTime && logDateTime <= endDateTime;
        });

        res.json(logs);
    });
});

module.exports = router;

