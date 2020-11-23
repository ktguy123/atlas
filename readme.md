# atlas

## 1. 概要
[こちら](https://github.com/ktguy123/node-express-realworld-example-app)をもとに実装中

## 2. 構成
* `app.js` - アプリケーションのエントリーポイント
* `config/` - 環境変数を管理
* `models/` - Mongooseモデルのスキーマ定義
* `routes/` - apiのルート定義（認証も含む）

## 2. API

* Users / ログイン

  ```http
  POST http://localhost:3000/api/v1/users/login
  
  {
  	"username" : "demouser",
  	"password" : "passeord"
  }
  ```

* Users / 新規登録

  ```http
  POST http://localhost:3000/api/v1/users/
  x-access-token : {{ログインで取得したtokenを設定する}}

  {
  	"username" : "demouser",
  	"password" : "passeord"
  }
  ```

* Users / User情報更新

  ```http
  PUT http://localhost:3000/api/v1/users/:id
  x-access-token : {{ログインで取得したtokenを設定する}}

  {
  	"username" : "demouser",
  	"password" : "passeord"
  }
  ```

* 記事一覧取得

  ```http
  GET http://localhost:3000/api/v1/api/v1/articles
  x-access-token : {{ログインで取得したtokenを設定する}}
  ```

* 記事取得

  ```http
  GET http://localhost:3000/api/v1/api/v1/articles/:id
  x-access-token : {{ログインで取得したtokenを設定する}}
  ```

* 記事作成

  ```http
  GET http://localhost:3000/api/v1/api/v1/articles/:id
  x-access-token : {{ログインで取得したtokenを設定する}}
  ```

* 記事更新

  ```http
  PUT http://localhost:3000/api/v1/api/v1/articles/:id
  x-access-token : {{ログインで取得したtokenを設定する}}
  
  {
  	title : "new_title"
   	description : "new_desc",  
   	body : "new_body" 
  }
  ```

* 記事削除

  ```http
  DELETE http://localhost:3000/api/v1/api/v1/articles/:id
  x-access-token : {{ログインで取得したtokenを設定する}}
  ```

  