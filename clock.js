const puppeteer = require('puppeteer');
const moment = require('moment');
const path = require('path');
const userinfo = require('./user.config');

var clock_on = async () => {
    const headless = true;
    const browser = await puppeteer.launch({headless});
    const page = await browser.newPage();
    await page.goto('https://my.stu.edu.cn/health-report/report/report.do');

    // await page.waitForNavigation();

    await (await page.$('[href=init-stu-user]')).click();

    await page.waitForNavigation();

    await (await page.$('#username')).type(userinfo.username);
    await (await page.$('#password')).type(userinfo.password);
    await (await page.$('#login')).click();
    
    await page.waitForNavigation();

    // <input type="number" name="dailyReport.afternoorBodyHeat" value="36.8" style="width: 50px" required=""></input>
    await page.$eval('input[name="dailyReport.afternoorBodyHeat"]',input => input.value='' );
    await (await page.$('input[name="dailyReport.afternoorBodyHeat"]')).type('36.8');
    // <input type="number" name="dailyReport.forenoonBodyHeat" value="36.8" style="width: 50px" required=""></input>
    await page.$eval('input[name="dailyReport.forenoonBodyHeat"]',input => input.value='' );
    await (await page.$('input[name="dailyReport.forenoonBodyHeat"]')).type('36.8');
    // <input type="radio" name="dailyReport.hasCough" value="false" checked="checked"></input>
    await page.click('input[type="radio"][name="dailyReport.hasCough"][value="false"]');
    // <input type="radio" name="dailyReport.hasShortBreath" value="false" checked="checked"></input>
    await page.click('input[type="radio"][name="dailyReport.hasShortBreath"][value="false"]');
    // <input type="radio" name="dailyReport.hasWeak" value="false" checked="checked"></input>
    await page.click('input[type="radio"][name="dailyReport.hasWeak"][value="false"]');
    // <input type="radio" name="dailyReport.hasFever" value="false" checked="checked"></input>
    await page.click('input[type="radio"][name="dailyReport.hasFever"][value="false"]');

    // <button id="submitBtn3" class="active">提交健康信息</button>
    await page.click('#submitBtn3');

    // <div id="noticeMsg" align="center"></div>
    // <div id="noticeMsg" align="center" style="display: block;">今天(06月17日)数据已上报成功!</div>
    await page.waitForSelector('#noticeMsg[style="display: block;"]');

    if (headless){
        try {
            await page.pdf({path: path.join(__dirname, `pdf/${moment(Date.now()).format('YYYY_MM_DD_HH_mm_ss')}.pdf`)});
        }
        catch(e){
            console.log(e);
        }
    }

    if (headless){
        await browser.close();
    }
};

module.exports = {
    clock_on,
};

if(__filename === process.mainModule.filename) {
    clock_on().then(()=>{
        console.log('ok, already clock on.')
    });
}