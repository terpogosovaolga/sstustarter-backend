export default function setAllHeader(res, status) {
  res.statusCode = status;
  res.setHeader("Content-Type", "application/json"); //В моем случае я получаю json
  res.setHeader("Access-Control-Allow-Origin", "*"); //Либо конкретный хост (поддерживается группа в виде массива)
  res.setHeader(
    "Access-Control-Allow-Methods",
    "GET, POST, OPTIONS, PUT, PATCH, DELETE"
  ); //Необходимые типы запросов
  res.setHeader("Access-Control-Allow-Credentials", true); //Означает, что должен быть получен ответ
  res.setHeader(
    "Access-Control-Allow-Headers",
    "X-Requested-With,content-type"
  );
}
