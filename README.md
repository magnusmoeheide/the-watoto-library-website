![Logo](https://db3pap002files.storage.live.com/y4moJ8uYuiW93prDk4qndV0dTlQxvU6Hma_nPAoKJ8pHg6qtIJ_6rJUeP5amSWNZCKwRezteG3jrJrr4X36OsHV-u48_N_5Qv0t62Tn9CH1UFtNv6jT0QKGp-mYzM0yJ2KXzHkpuIBJxL6VUz9tT4-nIFBC-R8g5_rdXg42zp7qGryxNpg7to_8eO8m08qi0L1D?encodeFailures=1&width=600&height=600)

# 📚 The Watoto Library 📚

## Project Description

The Watoto Library is a free library for kids in Africa's largest slum, Kibera.

The website is there for sponsors and everyone who interacts with the library. It serves as a platform to tell the stories of the Kibera kids and how the library impacts their lives, as well as listing our needs and enabling people to donate.

### Frameworks

The website uses React, JavaScript, PostgreSQL, Node.js

### Future

Currently the website online is static (thewatotolibrary.org) but the goal is to have this website up and running soon.

## How to use

The website visitors do not have any managing rights. However to manage the page, you need to manually be given an account by the website owner, then you can sign in to the admin page. To register for an admin account is not possible.

As admin you can (when the website is up) go to admin.thewatotolibrary.org and sign in with your email and password. Once logged in, you can do the following:

##### - Manage articles

##### - Manage the 'What we do' section

##### - Manage the 'About us' section

##### - Manage 'Our greatest needs'

##### - Manage the Team

## How to Install and Run the Project

To run the website locally you need the database.
Download the database from here and dump it to copy: https://1drv.ms/u/s!Ai2vvlpx_1zvgcBnXR9dLMnV65-FPA?e=Krono3

      psql dbname < twl-db.sql

### Set up RESTAPI

You also need the RESTAPI to connect the database with the frontend. Go to my repository:

    https://github.com/magnusmoeheide/twl-website-restapi

and clone it with this command:

      git clone git@github.com:magnusmoeheide/twl-website-restapi.git

Open db.js and fill in the correct user, database and password for your local computer:

![db-connection](https://ams02pap001files.storage.live.com/y4mtxv5ZUijYGTdGLGklX0lFlv9jPIk75EQMZa0c3DgWfHi9K9hPY_77wA5Ve_MMUxX6cQlyzcBSCfTj5bsKUI8pRi4bT9E-qSepju9ioNowOP2wRpeMz2EYce1Y1sK24tabzGskcT3auZEUzo_HL8zLnMfrU5z3s8_swsp9mnaFXP6y8MKAAf09vmHY8hoOW01?encodeFailures=1&width=954&height=588)

After that run this in the terminal:

      node server.js

### Set up the Project

To set up the website itself and run it on localhost:

##### 1. Clone the project

        git clone git@github.com:magnusmoeheide/the-watoto-library-website.git

##### 2. Go to the project directory

      cd the-watoto-library-website

##### 3. Install dependencies

      npm install

### Set up admin login

Go to https://firebase.google.com/ and add a new project. Follow the steps in their guide: https://firebase.google.com/docs/auth/web/password-auth

then install Firebase

      npm install firebase

Once you have Firebase installed and the project created in their website, go and change your firebase.js with the data in their website.

![firebaseConfig](https://ams02pap001files.storage.live.com/y4mFnyIk7wnN-1JgrD0tTyXpcXq8-kgQgZKCFZk5gcLxBSbbx1_OyD-P2Nh8_UpfCRZJzT80o4seYrGV_Yjg80Kdv5iDvVuzecuQQ50eLvFM06xaHenwHtu0rTZNXukdOSZLeGkZK-C-MqJRa9XSZ883QgGJI1jYTMq3rZhrssXGrn9xojG9UIE3cqd4kvwIDR0?encodeFailures=1&width=930&height=404)

Run the app

      npm run start

## Architecture

![Architecture](https://ams02pap001files.storage.live.com/y4muIWB4iWzmejlzwTDyrovr--a3IKsnOJzgjaSQ6uk2lcUMVKTK0zjTRNiB5Prb0fSUJ12sst-LpK6zUxYiHtrmA2ZC9Z8pJPIfljhpxin4mTJc7LLuy4h6gXWZMwa7L1FLTJOlZAfSQkcFbLBqycBslR0Nzgj-0slS6YGRcu12R-lWJxL7m1zvR8DbZT0Jvkn?encodeFailures=1&width=1628&height=948)

## Contact

magnus.heide@code.berlin
