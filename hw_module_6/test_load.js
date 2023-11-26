import http from 'k6/http';
import { check, group } from 'k6';
import{ sleep } from 'k6';
 
export let options = {
   stages: [
       //{ duration: '480s', target: 800 }, // simulate ramp-up of traffic from 1 to 3 virtual users over 0.5 minutes.
       { duration: '5m', target: 100}, // stay at 4 virtual users for 0.5 minutes
       //{ duration: '0.5m', target: 0 }, // ramp-down to 0 users
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
       const data = JSON.stringify({'name': 'Berlin'});
       const response = http.batch([
	       ['GET', 'http://91.185.85.213/Cities', null, params],
	       ['GET', 'http://91.185.85.213/Forecast', null, params],
	       ['PUT', 'http://91.185.85.213/Cities/2', data, params],
	       //['GET', 'http://91.185.85.213/WeatherForecast', null, params],
       ])
       sleep(1);
       check(response[0], {
           "status code should be 200": res => res.status === 200,
       });
   });
};
