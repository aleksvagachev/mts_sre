## Порядок выполнения домашнего задания:
* Развёрнуто 6 ВМ (balancer, db1, db2, etcd1, etcd2, etcd3)
* Поправлена роль разворота кластера PostgreSQL на Patroni:
  * Изменённые файлы:
    * vars/main.yml
    * inventory
* Извлечён скрипт по миграции данных из образа ghcr.io/ldest/sre-course/api
  - Migrations/init.sql
* Поднят образ в окружении Development, чтоб через swagger получить endpoints:
  - Cities
    - GET  /Cities/{id}
    - PUT  /Cities/{id}
    - POST /Cities
    - GET  /Cities
  - Forecast
    - GET  /Forecast/{id}
    - PUT  /Forecast/{id}
    - POST /Forecast/{cityId}
    - GET  /Forecast
  - WeatherForecast
    - GET  /WeatherForecast
* Применены изменения на боевую БД
* Настроен pg_hba, разрешив подключаться balancer'у к БД 
  - Можно прописать добавление IP balancer в файле vars/main.yml в секции postgresql_pg_hba. Но замечено это уже после разворота.
* Написан и применён helm chart:
  - cluster: grand-lion-d99896
  - namespace: sre-cource-student-15
  - user: student15
* Проверена работаспособность api (IP специально не указан)
  - Проверка что выполняется GET запрос: curl -XGET -H "Host: api.sre-course.vagachev" http://IP/Cities
  - Добавлена одна запись: curl -XPOST -H "Host: api.sre-course.vagachev" -H "Content-Type: application/json" -d '{"id": 1, "name": "Moscow"}' http://IP/Cities
  - Проверена что запись добавлена: curl -XGET -H "Host: api.sre-course.vagachev" -I http://IP/Cities/1
  - Проверены все записи: curl -XGET -H "Host: api.sre-course.vagachev" -I http://IP/WeatherForecast
