import jwt from 'jsonwebtoken'

export default (req, res, next) => {
    const token = (req.headers.authorization || '') // если там undefined, то все равно будет строка
        .replace(/Bearer\s?/, ''); // заменяем на пустую строку
    console.log(token);
    if (token) {
        try {
            const decoded = jwt.decode(token, 'myhash'); // декодируем
            req.userId = decoded._id; // вшиваем в запрос id пользователя
            console.log(req.userId);
            next(); // идем дальше, в следующую функцию
        } catch (error) {
            res.status(403).json({'message': 'Нет доступа'})
        }
    } else {
        res.status(403).json({'message': 'Нет доступа'})
    }
}