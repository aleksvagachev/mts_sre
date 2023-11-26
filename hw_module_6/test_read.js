import http from 'k6/http';
import { check, group } from 'k6';
import{ sleep } from 'k6';
 
export let options = {
   stages: [
       { duration: '480s', target: 800 },
       { duration: '1m', target: 800},
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
       const response = http.batch([
	       ['GET', 'http://91.185.85.213/Cities', null, params],
	       ['GET', 'http://91.185.85.213/Forecast', null, params],
	       ['GET', 'http://91.185.85.213/Cities/1', null, params],
	       ['GET', 'http://91.185.85.213/Forecast/1', null, params],
	       //['GET', 'http://91.185.85.213/WeatherForecast', null, params],
       ])
       sleep(1);
       check(response[0], {
           "Status code should be 200": res => res.status === 200,
       });
   });
};
