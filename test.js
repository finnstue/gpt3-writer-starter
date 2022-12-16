const foodArray = ["baking", "barbeque", "beer", "carnivore", "cocktails", "coffee", "cooking", "restaurants", "snacks_and_treats", "vegan", "vegetarian", "whiskey", "wine"];
const categoriesArray = ["entertainment", "food_and_drink", "home_and_family", "music", "nature_and_outdoors", "skills", "sports_and_activities", "travel_and_adventure"];
const entertainmentArray = ["boardgames_and_puzzles","cardgames","currentaffairs","history","movie_geek","reading","retro_and_old_school","sci_fi_fantasy","superhero","video_games"];

// <ToggleButton
            //   className="mb-2"
            //   id="entertainment"
            //   type="checkbox"
            //   variant="outline-primary"
            //   checked={category=="entertainment"}
            //   value="1"
            //   onChange={() => setCategory("entertainment")}
            // >
            //   Entertainment
            // </ToggleButton>
            // <ToggleButton
            //   className="mb-2"
            //   id="food"
            //   type="checkbox"
            //   variant="outline-primary"
            //   checked={category=="food_and_drink"}
            //   value="1"
            //   onChange={() => setCategory("food_and_drink")}
            // >
            //   Food & Drink
            // </ToggleButton>
            // <ToggleButton
            //   className="mb-2"
            //   id="toggle-check5"
            //   type="checkbox"
            //   variant="outline-primary"
            //   checked={interests.includes("food_and_drink")}
            //   value="1"
            //   onChange={() => {
            //     if (interests.includes("food_and_drink")) {
            //       let newInterests = interests.filter(item => item !== "food_and_drink")
            //       setInterests(newInterests)
            //     } else {
            //       setInterests([...interests,"food_and_drink"])
            //     }
            //     console.log(interests)
            //   }}
            // >
            //   Food & Drink
            // </ToggleButton>
            // <ToggleButton
            //   className="mb-2"
            //   id="toggle-check6"
            //   type="checkbox"
            //   variant="outline-primary"
            //   checked={interests.includes("home_and_family")}
            //   value="1"
            //   onChange={() => {
            //     if (interests.includes("home_and_family")) {
            //       let newInterests = interests.filter(item => item !== "home_and_family")
            //       setInterests(newInterests)
            //     } else {
            //       setInterests([...interests,"home_and_family"])
            //     }
            //     console.log(interests)
            //   }}
            // >
            //   Home & Family
            // </ToggleButton>
            // <ToggleButton
            //   className="mb-2"
            //   id="toggle-check7"
            //   type="checkbox"
            //   variant="outline-primary"
            //   checked={checked3}
            //   value="1"
            //   onChange={(e) => setChecked3(e.currentTarget.checked)}
            // >
            //   Music
            // </ToggleButton>
            // <ToggleButton
            //   className="mb-2"
            //   id="toggle-check8"
            //   type="checkbox"
            //   variant="outline-primary"
            //   checked={checked3}
            //   value="1"
            //   onChange={(e) => setChecked3(e.currentTarget.checked)}
            // >
            //   Nature & Outdoors
            // </ToggleButton>
            // <ToggleButton
            //   className="mb-2"
            //   id="toggle-check9"
            //   type="checkbox"
            //   variant="outline-primary"
            //   checked={checked3}
            //   value="1"
            //   onChange={(e) => setChecked3(e.currentTarget.checked)}
            // >
            //   Skills
            // </ToggleButton>
            // <ToggleButton
            //   className="mb-2"
            //   id="toggle-check10"
            //   type="checkbox"
            //   variant="outline-primary"
            //   checked={checked3}
            //   value="1"
            //   onChange={(e) => setChecked3(e.currentTarget.checked)}
            // >
            //   Sports & Activities
            // </ToggleButton>
            // <ToggleButton
            //   className="mb-2"
            //   id="toggle-check11"
            //   type="checkbox"
            //   variant="outline-primary"
            //   checked={checked3}
            //   value="1"
            //   onChange={(e) => setChecked3(e.currentTarget.checked)}
            // >
            //   Travel & Adventure
            // </ToggleButton>
