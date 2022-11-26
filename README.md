<h1 align="center">Workflow-platform</h1> 
<h3 align="center">Проект разработан для Хакатона <a href="https://ityakutia.com/hack-the-ice" target="_blank">HACK-the-ICE</a></h3>

Проект представляет собой сервер, созданный для <a href="https://github.com/redline111111/WorkFlow-platform-client" target="_blank">клиентской части прототипа</a>. На стороне сервера реализовано API, которое предоставляет следующие модули: auth, teams, dashboard.

## Модуль auth

В данном модуле используются следующие endpoint'ы:
  1. (post)/register - позволяет регистрироваться 
  2. (post)/login - позволяет войти в аккаунт
  3. (get)/me - проверка авторизации

## Модуль teams

В данном модуле используются следующие endpoint'ы:
  1. (post)/register - позволяет создать команду
  2. <span style="color:red">(get)</span>/ - возвращает список всех команд
  3. <span style="color:red">(get)</span>/:name - позволяет выбрать конкретную команду по названию

## Модуль dashboard

В данном модуле используются следующие endpoint'ы:
  1. <span style="color:red">(get)</span>/locations - возвращает местоположениe(город и координаты) всех пользователей
  
## Модуль bot

В данном модуле используются следующие endpoint'ы:
  1. <span style="color:red">(get)</span>/match/:string - использует самописный алгоритм сравнения строки и ключевых фраз из БД и возвращает все совпадения
  2. <span style="color:red">(get)</span>/bot/questions - возвращает список всех не решенных вопросов
  3. (post)/bot/questions - добавить нерешенный вопрос
  4. (post)/bot - добавляет ключевую фразу
  
## Команда

**Название:** Entity

**Состав:** Решетников Андрей(менеджер), Алина Дробышевская(дизайнер), Хандобин Илья(разработчик)
## Стек технологий
**Язык:** Node.js

**База данных:** Mongodb

**Библиотеки и вспомогательные инструмены:** Express, Mongoose, bcrypt, jsonwebtoken, express-validator, cors, nodemon
