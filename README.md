# CRUD
Crud of products with login for users, developed with ts html bootstrap css ajax.
The frontend was done in typescript, i also used ajax and jquery to send the requests to the backend which was developed in nodejs.

First you have to open xamp, run apache and mysql, 
The login page:

![db6cd668bcff7e6b9d9d3ec82a1565ae](https://github.com/joacoox/CRUD/assets/113536722/40bb3f15-deb5-4fc2-b450-9b35883492d7)

The users are hardcoded. When you login with a valid user, the backend(nodejs) generates a jwt with useful information such as the permissions of the user in question and somedata like the id and name. There are different kinds of users with different permissions. 
Only the "administrador" and "supervisor" can update and delete. 


![1f743a940643e80be745733b9435a936](https://github.com/joacoox/CRUD/assets/113536722/9d7adf24-9f7d-46ba-991c-68b1dbcd753d)

The jwt(token)


![82aabbe8a38b09149059371b63ceed6a](https://github.com/joacoox/CRUD/assets/113536722/55da2b23-bd0e-4a33-812f-6200fec8551f)

also if the token expires you can no longer be in the page "pricipal.html" you'll be redirected to "index.html"

You also can verify the information that was send in the token.

![cb3459436c5be0380cfaee2145c36b80](https://github.com/joacoox/CRUD/assets/113536722/462a4882-cfa5-49c4-8145-11c7399632f1)


Then you have a crud of products, you can create, read, update and delete products.

Read:

![aca9040cda7c4fb666c9cd496fd1ebce](https://github.com/joacoox/CRUD/assets/113536722/0b41366c-bd7f-4f23-958b-60ab49b28b04)


Create:

![4b1658fa097c6e4d7087a47d9bb10312](https://github.com/joacoox/CRUD/assets/113536722/00e2e935-b224-45af-bbeb-428e6e915e6c)
![fda15f00ce20fd19641c32e01dee881f](https://github.com/joacoox/CRUD/assets/113536722/8821e165-c20b-4597-ba83-22d94d27ef1d)

Update:


![ccc386b7ca6d509d16f965cfcdabd49e](https://github.com/joacoox/CRUD/assets/113536722/62f32e29-3827-4e2c-ba82-7a8a1ac9b406)
![0bd91d55e80d5ef251aa5d9519ef77a5](https://github.com/joacoox/CRUD/assets/113536722/66e80528-2414-498a-bc63-4afc098a8b73)


Delete:

![287859031-66e80528-2414-498a-bc63-4afc098a8b73](https://github.com/joacoox/CRUD/assets/113536722/a7ac5189-5177-43af-81d9-78fca5da981e)
![3a5e66398b941503a871a651271e8ebe](https://github.com/joacoox/CRUD/assets/113536722/85fceaa4-55e7-49f2-84f0-140dfb9a0c53)


