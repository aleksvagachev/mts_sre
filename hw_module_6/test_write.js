import http from 'k6/http';
import { check, group } from 'k6';
import{ sleep } from 'k6';
 
export let options = {
   stages: [
       { duration: '180s', target: 100 },
       { duration: '1m', target: 100},
     ],
};
 
export default function () {
   group('API uptime check', () => {
       const params = {
           headers: {
              'Content-Type': 'application/json',
              'Host': 'api.sre-course.vagachev',
           },
       };
       const data_put_cities = JSON.stringify({'name': 'Berlin'});
       const data_put_forecast = JSON.stringify({'id': 1, 'cityId': 1, 'dateTime': 26, 'temperature': -5, 'summary': 'Fall'});
       const response = http.batch([
	       ['PUT', 'http://91.185.85.213/Cities/2', data_put_cities, params],
	       ['PUT', 'http://91.185.85.213/Forecast/1', data_put_forecast, params],
       ])
       sleep(1);
       check(response[0], {
           "status code should be 200": res => res.status === 200,
       });
   });
};
