//ここからts共通部分
export {};
const express = require('express');
const router = express.Router();
//ここまで共通部分

const mysql = require('mysql2');
    let connection:any;
    let result:any;
    connection = mysql.createConnection({
            host: process.env.DB_HOST,
            user: process.env.DB_USER,
            password: process.env.DB_PASSWORD,
            database: process.env.DB_DATABASE,
            multipleStatements: true
        });


router.get("/select",
    (request:any, response:any, next:any) => {
        connection.query(
            "select * from for_test_use ORDER BY id asc",
            [],
            (error:any,result:any) =>{
                if(error){
                    console.log(error)
                    response.render("./database_select", {url:"/"})
                    console.log("；；")
                    return
                }

                for (let index = 0; index < result.length; index++) {
                    console.log(result[index]);
                }

                response.render("./database_select", {result: result})
            }
        )
    }
);


router.get("/insert",
    (request:any, response:any, next:any) => {
        response.render("database_insert")
    }
)


router.post("/insert_commit",
(request:any, response:any, next:any) => {
    //現在のローカルタイムを取得する
    let date = new Date();
    connection.query(
        "insert into for_test_use(id,name,datetime) Values(?,?,?)",
        [request.body.id, request.body.name, date],
        (error:any,result:any) =>{
            if(error){
                console.log(error)
                response.redirect("/database/select")
                console.log("；；")
                return
            }

        console.log("Insert ok");


        response.redirect("/database/select")
        }
    )
}
);


router.get("/update",
    (request:any, response:any, next:any) => {
        connection.query(
            "select id,name,datetime from for_test_use",
            [],
            (error:any,result:any) =>{
                if(error){
                    console.log(error)
                    response.render("./database_select", {url:"/"})
                    console.log("；；")
                    return
                }

                for (let index = 0; index < result.length; index++) {
                    console.log(result[index]);
                }

                let result_str = JSON.stringify(result);

                response.render("./database_update", {result: result, result_str: result_str})
            }
        )
    }
);

router.post("/update_commit",
(request:any, response:any, next:any) => {
    connection.query(
        "UPDATE for_test_use SET name=? WHERE id = ?",
        [request.body.name, request.body.id],
        (error:any,result:any) =>{
            if(error){
                console.log(error)
                response.redirect("/database/select")
                console.log("；；")
                return
            }

        console.log("Update ok");


        response.redirect("/database/select")
        }
    )
}
);


router.get("/delete",
    (request:any, response:any, next:any) => {
        connection.query(
            "select id,name,datetime from for_test_use",
            [],
            (error:any,result:any) =>{
                if(error){
                    console.log(error)
                    response.render("./database_select", {url:"/"})
                    console.log("；；")
                    return
                }

                for (let index = 0; index < result.length; index++) {
                    console.log(result[index]);
                }

                let result_str = JSON.stringify(result);

                response.render("./database_delete", {result: result, result_str: result_str})
            }
        )
    }
);

router.post("/delete_commit",
(request:any, response:any, next:any) => {
    connection.query(
        "DELETE FROM for_test_use WHERE id = ?",
        [request.body.id],
        (error:any,result:any) =>{
            if(error){
                console.log(error)
                response.redirect("/database/select")
                console.log("；；")
                return
            }

        console.log("Delete ok");


        response.redirect("/database/select")
        }
    )
}
);



module.exports = router;