UrlParm = function() { // url参数
    var data, index;
    (function init() {
        data = [];
        index = {};
        var u = window.location.search.substr(1);
        if (u != '') {
            var parms = decodeURIComponent(u).split('&');
            for (var i = 0, len = parms.length; i < len; i++) {
                if (parms[i] != '') {
                    var p = parms[i].split("=");
                    if (p.length == 1 || (p.length == 2 && p[1] == '')) {// p | p=
                        data.push(['']);
                        index[p[0]] = data.length - 1;
                    } else if (typeof(p[0]) == 'undefined' || p[0] == '') { // =c | =
                        data[0] = [p[1]];
                    } else if (typeof(index[p[0]]) == 'undefined') { // c=aaa
                        data.push([p[1]]);
                        index[p[0]] = data.length - 1;
                    } else {// c=aaa
                        data[index[p[0]]].push(p[1]);
                    }
                }
            }
        }
    })();
    return {
        // 获得参数,类似request.getParameter()
        parm : function(o) { // o: 参数名或者参数次序
            try {
                return (typeof(o) == 'number' ? data[o][0] : data[index[o]][0]);
            } catch (e) {
            }
        },
        //获得参数组, 类似request.getParameterValues()
        parmValues : function(o) { //  o: 参数名或者参数次序
            try {
                return (typeof(o) == 'number' ? data[o] : data[index[o]]);
            } catch (e) {}
        },
        //是否含有parmName参数
        hasParm : function(parmName) {
            return typeof(parmName) == 'string' ? typeof(index[parmName]) != 'undefined' : false;
        },
        // 获得参数Map ,类似request.getParameterMap()
        parmMap : function() {
            var map = {};
            try {
                for (var p in index) {  map[p] = data[index[p]];  }
            } catch (e) {}
            return map;
        }
    }
}();
var recipesDataList = [
{ id:1,
    name:'Spring Bento',
    imageSrc:'images/recipes_image/食谱1.jpg',
    recipesDetailDescribe:'1. First wash the ingredients, remove the shrimp line, cut the asparagus, and tear the broccoli into small flowers. \n2. Blanch broccoli and corn kernels, drain and set aside. \n3. Stir fry asparagus and shrimps until done. Season with a little salt and black pepper. \n4. Put diced ham, seaweed and an appropriate amount of chewy salad dressing egg yolk taste into the rice, mix evenly, and pinch out your favorite rice ball shape. \n5. Break up the egg liquid, add an appropriate amount of Chubi salad dressing, and mix the egg yolk taste. \n6. Brush the pot with oil, pour in part of the egg liquid, roll it up after slowly solidifying over a low fire, put cucumber slices in the pot, and then pour in the rest of the egg liquid. When the egg liquid solidifies, roll up the egg roll, cool it and cut it into sections. \n7. Put all the prepared salad ingredients into the bento box, bake with Chubi salad juice and season with sesame flavor. ',
    ingredients:'Asparagus 80g, sweet corn 80g, ham, mixed lettuce, carrot, cedar seaweed, fresh shrimp, rice, broccoli, virgin fruit, cucumber, cheese, egg, salt, black pepper, chewy salad sauce egg yolk taste, chewy salad juice baked sesame taste',
    timePreparation:'120 minute',
    serves:'',
},
{ id:2,
    name:'Carrot salad',
    imageSrc:'images/recipes_image/食谱2.jpg',
    recipesDetailDescribe:'1. Wash and shred carrots, add a little salt and let them stand. \n2. When the water in the carrot seeps out, drain the water. \n3. Wash the coriander, chop it up and put it on a plate. Add carrots, pour Chubi salad juice, bake and fry sesame flavor, and mix well. \n4. Finally, sprinkle almond slices and it is done.',
    ingredients:'Carrot, coriander, almond slices, salt, chewy salad juice, roasted sesame flavor',
    timePreparation:'120 minute',
    serves:'',
},
{ id:3,
    name:'Banana roll',
    imageSrc:'images/recipes_image/食谱3.jpg',
    recipesDetailDescribe:'1. Cut off the four sides of the toast and gently roll the toast thin with a rolling pin. \n2. Wrap the peeled banana with toast and roll it tightly. \n3. Mix eggs + milk + soft white sugar evenly and set aside. \n4. Put bananas in rolls 3. \n5. Put it into the oil pan, fry it into golden yellow on all sides, take it out of the pot, and finally mount it with Chubi salad sauce, which is fragrant and sweet. You can eat it. 2 slices of toast, 2 small bananas, 1 egg, 10g milk, 10g soft white sugar, 15g edible oil, chewy salad, sweet sauce and appropriate taste',
    ingredients:'2 slices of toast, 2 small bananas, 1 egg, 10g milk, 10g soft white sugar, 15g edible oil, chewy salad, sweet sauce and appropriate taste',
    timePreparation:'120 minute',
    serves:'',
},
{ id:4,
    name:'Christmas sandwich',
    imageSrc:'images/recipes_image/食谱4.jpg',
    recipesDetailDescribe:'1. Cut the bread slice into snowflakes, spread lettuce on the plate, stack bread, lettuce, cheese and ham in turn, and squeeze an appropriate amount of chewy salad sauce with egg yolk taste. \n2. Then stack bread, lettuce, ham and tomatoes in turn, squeeze an appropriate amount of chewy salad dressing and egg yolk taste twice. \n3. Then fold bread and cheese and decorate them according to your preferences.',
    ingredients:'200g sliced bread, 50g sliced ham, 30g cheese, 20g onion, 30g tomato, appropriate amount of lettuce, chubby salad dressing and egg yolk',
    timePreparation:'120 minute',
    serves:'',
},
{ id:5,
    name:'Chestnut rolls',
    imageSrc:'images/recipes_image/5.png',
    recipesDetailDescribe:'1. Tear the noodles into large pieces by hand and soak them in a mixture of milk and eggs until half dry. \N2. After shelling, cut chestnuts into large pieces and mix them with bread. \N3. Roll it up with fresh-keeping film and steam it in the pot for 10 minutes. \N4. After steaming, remove the preservative film and cut it into pieces. Squeeze it with Chubi salad sauce. It tastes sweet and delicious. ',
    ingredients:'5 chestnuts, 1 / 2 noodles, 1 egg, 200g milk, chewy salad, sweet sauce and moderate taste',
    timePreparation:'120 minute',
    serves:'',
},
{ id:6,
    name:'Hot Wing',
    imageSrc:'images/recipes_image/6.png',
    recipesDetailDescribe:'1) Clean the chicken wings and chop them into small pieces with a knife. \N2) put the chicken wings into a clean container, pour in cooking wine, add a little refined salt and marinate for 2 hours. \N3) sprinkle dry starch into the pickled chicken wings and mix well. \N4) put oil in the pot, when the oil is 70% hot, put chicken wings and fry over low heat until golden, remove the oil control and set aside. \N5) remove the seeds and cut the dried red pepper into sections, and slice ginger and garlic. \N6) preparing sauce: pour an appropriate amount of cooking wine into a clean small bowl, and add an appropriate amount of refined salt and sugar. \N7) add a tablespoon of balsamic vinegar, a little soy sauce and starch, and stir into the sauce for standby. \N8) in another oil pan, add pepper, ginger slices and garlic slices to saute until fragrant. \N9) add the red pepper section and stir fry to make it spicy. 10) Pour in the oil and stir fry the chicken wings. \N11) pour in the prepared juice, stir fry, and then collect the juice over a low heat.',
    ingredients:'400g chicken wings, moderate oil, moderate salt, 25g red pepper, moderate pepper, moderate ginger, moderate garlic, moderate cooking wine, moderate sugar, moderate vinegar, moderate soy sauce, moderate starch ',
    timePreparation:'120 minute',
    serves:'',
},
{ id:7,
    name:'Shrimp egg soup',
    imageSrc:'images/recipes_image/7.png',
    recipesDetailDescribe:'1. Clean the shrimp and take only the shrimps. Knock the eggs into the bowl. \n2. Break up the egg and add a small amount of salt and chicken powder to taste. Be sure to put less salt. The egg itself contains a small amount of salt. 3. Then prepare a cup of warm water (about 30 degrees), or chicken soup. Add warm water to the egg liquid. The ratio of water to egg is about 2:1. Then stir in one direction and clean up the foam. The best water for pouring egg liquid is warm water, not tap water and hot water. Because there is air in the tap water, after the water is boiled, the air is discharged, and honeycomb will appear in the egg soup, which will affect the quality and taste of the egg soup, and the nutritional components will also be damaged. Do not use the water to steam the egg soup, or it will not even damage the nutrition of the egg soup. It is best to steam egg soup with warm water or cold boiled water, which can ensure both taste and appearance. The amount of water is also very important. Too little will make the taste of the custard more compact and older. Too much custard is not easy to form, and the taste will be watery. When beating the egg liquid, do not stir the egg liquid violently. Stirring the egg liquid violently or for a long time before steaming will make the egg liquid bubble. It is best to beat the egg liquid, add water, and then slightly disperse and stir it.',
    ingredients:'Fresh shrimp, chives, eggs, salt, warm water, chicken powder, sesame oil',
    timePreparation:'120 minute',
    serves:'',
},
{ id:8,
    name:'Japanese coke cake',
    imageSrc:'images/recipes_image/8.png',
    recipesDetailDescribe:'1. Stir fry chopped onions until fragrant, then add beef stuffing and stir fry. \n2. Beef discoloration, add corn and peas, add a little salt and stir fry. \n3. Steam the potatoes and grind them into mud. \n4. Add fried beef stuffing into mashed potatoes, add chubby salad dressing and egg yolk taste to taste, sprinkle a little black pepper and stir well. \n5. Take the size of the palm and reshape it. \n6. First stick a layer of flour and then wrap it with egg liquid. \n7. Finally, covered with bread bran, fry over medium heat until golden yellow. \n8. Deep fried coke cake, squeeze some chewy salad dressing, egg yolk taste, the flavor is the best. ',
    ingredients:'150g potatoes, 120g beef stuffing, 80g onions, 40g peas, 40g corn kernels, 1 egg, appropriate amount of flour, appropriate amount of bread bran, a little salt, appropriate amount of black pepper, and appropriate taste of egg yolk in Chubi salad dressing',
    timePreparation:'120 minute',
    serves:'',
},
];