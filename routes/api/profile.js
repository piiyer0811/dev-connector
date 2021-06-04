const express = require("express");
const router = express.Router();
const auth = require("../../middleware/auth");
const User = require("../../models/User");
const Profile = require("../../models/Profile");
const { check, validationResult } = require("express-validator");
const request = require("request");
const config = require("config");

// @route  GET api/profile/me
// @desc   get my profile route
// @acess  protected
router.get("/me", auth, async (req, res) => {
  try {
    const profile = await Profile.findOne({ user: req.user.id }).populate(
      "user",
      ["name", "avatar"]
    );
    if (!profile) {
      return res.status(400).json({ msg: "There is no profile for this user" });
    }

    return res.json(profile);
  } catch (e) {
    console.error(e.message);
    res.status(500).send("Server Error");
  }
});

// @route  POST api/profile
// @desc   create or update a user profile
// @acess  protected

router.post(
  "/",
  [
    auth,
    [
      check("status", "Status is required").not().isEmpty(),
      check("skills", "Skill is required").not().isEmpty(),
    ],
  ],
  async (req, res) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }

    const {
      company,
      website,
      location,
      bio,
      status,
      githubusername,
      skills,
      youtube,
      facebook,
      twitter,
      instagram,
      linkedin,
    } = req.body;

    //Build profile object

    const profileFields = {};

    profileFields.user = req.user.id; // the req.user comes from the middleware
    if (company) profileFields.company = company;
    if (website) profileFields.website = website;
    if (location) profileFields.location = location;
    if (bio) profileFields.bio = bio;
    if (status) profileFields.status = status;
    if (githubusername) profileFields.githubusername = githubusername;

    if (skills) {
      profileFields.skills = skills.split(",").map((skill) => {
        return skill.trim();
      }); //convert the given string into an array and removing spaces from both side
    }

    //Build social object

    profileFields.social = {};
    if (youtube) profileFields.social.youtube = youtube;
    if (facebook) profileFields.social.facebook = facebook;
    if (twitter) profileFields.social.twitter = twitter;
    if (instagram) profileFields.social.instagram = instagram;
    if (linkedin) profileFields.social.linkedin = linkedin;

    try {
      let profile = await Profile.findOne({ user: req.user.id });

      if (profile) {
        profile = await Profile.findOneAndUpdate(
          { user: req.user.id },
          { $set: profileFields },
          { new: true, useFindAndModify: false }
        );

        return res.json(profile);
      }

      profile = new Profile(profileFields);
      await profile.save();
      return res.json(profile);
    } catch (err) {
      console.error(err.message);
      res.status(500).send("Server Error");
    }

    //res.send("Hello");
  }
);

// @route  GET api/profile/
// @desc   get my profile route
// @acess  public

router.get("/", async (req, res) => {
  try {
    const profiles = await Profile.find().populate("user", ["name", "avatar"]);
    res.json(profiles);
  } catch (error) {
    console.error(error.message);
    res.status(500).send("Server Error");
  }
});

// @route  GET api/profile/user/:user_id
// @desc   get profile by user id
// @acess  public

router.get("/user/:user_id", async (req, res) => {
  //:user_id, the colon is used to specify a placeholder

  try {
    const profile = await Profile.findOne({
      user: req.params.user_id,
    }).populate("user", ["name", "avatar"]);
    if (!profile) {
      return res.status(400).json({ msg: "Profile Not found" });
    }
    return res.json(profile);
  } catch (error) {
    console.error(error.message);

    if (error.kind == "ObjectId") {
      return res.status(400).json({ msg: "Profile Not found" });
    }
    res.status(500).send("Server error");
  }
});

// @route  DELETE api/profile/
// @desc   delete the profile,user and posts

// @acess  protected

router.delete("/", auth, async (req, res) => {
  try {
    await Profile.findOneAndDelete({ user: req.user.id });
    // @todo   delete posts
    await User.findOneAndDelete({ _id: req.user.id });

    return res.json({ msg: "User deleted" });
  } catch (error) {
    console.error(error.message);
    res.status(500).send("Server Error");
  }
});

// @route  PUT api/profile/experience
// @desc   add user experience to the profile

// @acess  protected

router.put(
  "/experience",
  [
    auth,
    [
      check("title", "title is required").not().isEmpty(),
      check("company", "Company is required").not().isEmpty(),
      check("from", "The from date is required").not().isEmpty(),
    ],
  ],
  async (req, res) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }

    const { title, company, location, from, to, current, description } =
      req.body;

    const experienceField = {
      title,
      company,
      location,
      from,
      to,
      current,
      description,
    };

    try {
      const profile = await Profile.findOne({ user: req.user.id });
      profile.experience.unshift(experienceField);

      await profile.save();

      return res.json({ profile });
    } catch (error) {
      console.error(error.message);
      res.status(500).send("Server Error");
    }
  }
);

// @route  DELETE api/profile/experience/:exp_id
// @desc   delete user experience from the profile

// @acess  protected

router.delete("/experience/:exp_id", auth, async (req, res) => {
  try {
    const profile = await Profile.findOne({ user: req.user.id });

    const newExp = profile.experience.filter((exp) => {
      return exp._id.toString() !== req.params.exp_id;
    });

    profile.experience = newExp;

    await profile.save();

    return res.json(profile);
  } catch (err) {
    console.error(err.message);
    res.status(500).send("Server Error");
  }
});

// @route  PUT api/profile/education
// @desc   add user education to the profile

// @acess  protected

router.put(
  "/education",
  [
    auth,
    [
      check("school", "school is required").not().isEmpty(),
      check("degree", "degree is required").not().isEmpty(),
      check("fieldofstudy", "The field of study is required").not().isEmpty(),
      check("from", "The from date is required").not().isEmpty(),
    ],
  ],
  async (req, res) => {
    //console.log(req.body);
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }

    const { school, degree, fieldofstudy, from, to, current, description } =
      req.body;

    const educationField = {
      school,
      degree,
      fieldofstudy,
      from,
      to,
      current,
      description,
    };

    try {
      const profile = await Profile.findOne({ user: req.user.id });
      profile.education.unshift(educationField);

      await profile.save();

      return res.json({ profile });
    } catch (error) {
      console.error(error.message);
      res.status(500).send("Server Error");
    }
  }
);

// @route  DELETE api/profile/education/:edu_id
// @desc   delete user education from the profile

// @acess  protected

router.delete("/education/:edu_id", auth, async (req, res) => {
  try {
    const profile = await Profile.findOne({ user: req.user.id });

    const newEdu = profile.education.filter((edu) => {
      return edu._id.toString() !== req.params.edu_id;
    });

    profile.education = newEdu;

    await profile.save();

    return res.json(profile);
  } catch (err) {
    console.error(err.message);
    res.status(500).send("Server Error");
  }
});

// @route  GET api/profile/github/:username
// @desc   get user repos from github

// @acess  public

router.get("/github/:username", (req, res) => {
  try {
    const options = {
      uri: `https://api.github.com/users/${
        req.params.username
      }/repos?per_page=5&sort=created:asc&client_id=${config.get(
        "githubClientId"
      )}&client_secret=${config.get("githubSecret")}`,
      method: "GET",
      headers: { "user-agent": "node.js" },
    };

    request(options, (error, response, body) => {
      if (error) {
        console.error(error);
      }
      if (response.statusCode !== 200) {
        return res.status(404).json({ msg: "No github profile found" });
      }

      res.json(JSON.parse(body));
    });
  } catch (err) {
    console.error(err.message);
    res.status(500).send("Server Error");
  }
});

module.exports = router;
