import express from "express";
// import { knex } from "../app";
// eslint-disable-next-line new-cap
const router = express.Router();
import sideMenuList from "../tools/data/sidemenu.json";

router.get("/profile", (request, response) => {
  if (request.user) {
    response.render("user/member_information_confirmation", {
      side_menu: JSON.parse(JSON.stringify(sideMenuList))[
        `${Boolean(request.user)}`
      ],
      userInfo: request.user,
    });
  } else {
    response.redirect("/invalidAccess");
  }
});

router.get("/profile/edit", (request, response) => {
  if (request.user) {
    response.render("user/member_information_modification", {
      side_menu: JSON.parse(JSON.stringify(sideMenuList))[
        `${Boolean(request.user)}`
      ],
      userInfo: request.user,
    });
  } else {
    response.redirect("/invalidAccess");
  }
});

router.get("/profile/edit/icon", (request, response) => {
  if (request.user) {
    response.render("user/icon_modification", {
      side_menu: JSON.parse(JSON.stringify(sideMenuList))[
        `${Boolean(request.user)}`
      ],
      userInfo: request.user,
    });
  } else {
    response.redirect("/invalidAccess");
  }
});

export default router;
