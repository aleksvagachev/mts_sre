# Домашняя работа по шестому модулю

## Порядок выполнения домашнего задания:
В ходе выполнения домашнего задания разработаны скрипты для инструмента НТ k6, для тестирования API системы, в виде трёх профилей нагрузки:
1. Только чтение
2. Только запись
3. Смешанная нагрузка


### Нефункциональные требования по производительности системе (SLO/SLA)
1 SLO
* Время ответа не больше 2с
* Количество ошибок не превышает больше 5 ошибок в секунду
* Максимальное число запросо в секунду не превышает 300 rps/s

2 SLA 
* Обеспечивать 99,95% доступности и надёжности сервиса
* Ликвидация проблем занимает не больше 2 часов
* При не выполнении указанных требований накладываются штрафные санкции

### Узкое место системы
В ходе тестирования опеределно, что самым узким местом является приложение и его конфинурация.
* При росте клиентов не справляется подключение к БД. При количестве клиентов больше 300 мы выходим за SLO. При количестве клиентов больше 500 приложение перестаёт нормально функционировать.
k6 - http://5eca9364-3899-4021-b861-fd4f64e48c6d.mts-gslb.ru/d/ccbb2351-2ae2-462f-ae0e-f2c893ad1028fgdf/k6-prometheus?orgId=1&var-DS_PROMETHEUS=Vagachev_Aleksandr_Prometheus&var-testid=All&var-quantile_stat=p99&from=1701022420312&to=1701023074019
4GS - http://5eca9364-3899-4021-b861-fd4f64e48c6d.mts-gslb.ru/d/MhKgQ2nSk/four-golden-signals?orgId=1&from=1701022406141&to=1701023103799
Postgres - http://5eca9364-3899-4021-b861-fd4f64e48c6d.mts-gslb.ru/d/000000039ds/postgresql?orgId=1&from=1701022416771&to=1701022865470
VM - http://5eca9364-3899-4021-b861-fd4f64e48c6d.mts-gslb.ru/d/rYdddlPWk1qaz/system-metrics?from=1701022420923&to=1701022935209&orgId=1&var-DS_PROMETHEUS=Vagachev_Aleksandr_Prometheus&var-job=prometheus_node&var-node=10.0.10.3:9100&var-diskdevices=%5Ba-z%5D%2B%7Cnvme%5B0-9%5D%2Bn%5B0-9%5D%2B%7Cmmcblk%5B0-9%5D%2B

* Не оптимальный метод для ручки /WeatherForecast и ограничение пуллера, приводит к ошибкам и перезапуску приложения. Проблем со стороны ВМ и PG не наблюдается
За SLO выходим при пользователях больше 100
k6 - http://5eca9364-3899-4021-b861-fd4f64e48c6d.mts-gslb.ru/d/ccbb2351-2ae2-462f-ae0e-f2c893ad1028fgdf/k6-prometheus?orgId=1&var-DS_PROMETHEUS=Vagachev_Aleksandr_Prometheus&var-testid=All&var-quantile_stat=p99&from=1701020132835&to=1701020525225
4GS - http://5eca9364-3899-4021-b861-fd4f64e48c6d.mts-gslb.ru/d/MhKgQ2nSk/four-golden-signals?orgId=1&from=1701020130680&to=1701020554764
Postgres - http://5eca9364-3899-4021-b861-fd4f64e48c6d.mts-gslb.ru/d/000000039ds/postgresql?orgId=1&from=1701020135312&to=1701020485918
VM - http://5eca9364-3899-4021-b861-fd4f64e48c6d.mts-gslb.ru/d/rYdddlPWk1qaz/system-metrics?from=1701020111875&to=1701020512465&orgId=1&var-DS_PROMETHEUS=Vagachev_Aleksandr_Prometheus&var-job=prometheus_node&var-node=10.0.10.3:9100&var-diskdevices=%5Ba-z%5D%2B%7Cnvme%5B0-9%5D%2Bn%5B0-9%5D%2B%7Cmmcblk%5B0-9%5D%2B
