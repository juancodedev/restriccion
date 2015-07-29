import '../../utils/testDbHelper.js';
import chai from 'chai';
import * as RestrictionDay from '../../models/RestrictionDay';
import request from 'supertest-as-promised';
import {app} from '../../../server.js';
import cheerio from 'cheerio';


chai.should();


describe('Website', () => {
  it('should render correct RestrictionDay', done => {

    const testDate = new Date('December 31, 2015 11:13:00');

    RestrictionDay.create({
      fecha  : testDate,
      estatus: 'Preemergencia Ambiental',
      numeros: {
        conSello: [7, 8],
        sinSello: [1, 2, 3, 4, 9, 0]
      }
    })
    .then(function(){
      request(app.listen())
        .get('/')
        .expect(200)
        .expect(restrictionDayInfo)
        .end(done);
    });
  });
});


function restrictionDayInfo(res){
  const $ = cheerio.load(res.text.toString());
  const sinSello = $('.sinSello h4').text();
  const conSello = $('.conSello h4').text();
  const day = $('.picker__day-display div').text();
  const dayName = $('.picker__weekday-display').text();
  const month =  $('.picker__month-display div').text();
  const year =  $('.picker__year-display div').text();
  const status = $('h5').first().text();

  if(!(/1-2-3-4-9-0/.test(sinSello))){ throw Error('sinSello doesn\'t match!'); }
  if(!(/7-8/.test(conSello))){ throw Error('conSello doesn\'t match!'); }
  if(!(/31/.test(day))){ throw Error('day doesn\'t match!'); }
  if(!(/Jueves/.test(dayName))){ throw Error('dayName doesn\'t match!'); }
  if(!(/Diciembre/.test(month))){ throw Error('month doesn\'t match!'); }
  if(!(/2015/.test(year))){ throw Error('year doesn\'t match!'); }
  if(!(/Preemergencia Ambiental/.test(status))){ throw Error('status doesn\'t match!'); }
}
