$(function () {
    // ================================ Regular obsevables ================================ //
    function viewModel() {
        // ============== Header Info ============== //
        // Can contain either strings, numbers or datetime.
        this.OtherInfo = ko.observableArray(["Languages I know: Nihongo, Hebrew, english",
            "Goal: To be a Chef","Favorite things to watch: Anime","Things I like: Meat and vegtables", "Things I dislike todo: Dancing and singing"]);
        this.Title = ko.observable("Knockout.JS - Resume project");
        this.Profession = ko.observable("Software Developer");
        this.GeneralInfo = {
            FirstName: ko.observable("Omri"),
            LastName: ko.observable("Zeevi"),
            Age: ko.observable(25)
        };
        this.GeneralInfo["FullName"] = ko.computed({
            read: () => this.GeneralInfo.FirstName() + " " + this.GeneralInfo.LastName(),
            write: (value) => {
                var lastSpacePos = value.lastIndexOf(" ");
                if (lastSpacePos > 0) {
                    this.GeneralInfo.FirstName(value.substring(0, lastSpacePos)); // Update "FirstName"
                    this.GeneralInfo.LastName(value.substring(lastSpacePos + 1)); // Update "LastName"
                }
            },
            owner: this
        });
        // ============== Main Info ============== //
        // -------- Links -------- //
        const linksToProfile = [
            { link: ko.observable("https://www.linkedin.com/in/omrizeevi/"), text: ko.observable("LinkedIn") },
            { link: ko.observable("https://github.com/OZcomingFRoo"), text: ko.observable("GitHub") }];
        this.LinksToProfile = ko.observableArray(linksToProfile);
        this.AddLink = () => {
            let link = window.prompt("Link", "");
            let text = window.prompt("Link's  text", "Link...");
            this.LinksToProfile.push({ link: ko.observable(link), text: ko.observable(text) });
        }
        // -------- Knowledge -------- //
        // Seed Data
        function createCategory(id, desc) { return { Id: ko.observable(id), Desc: ko.observable(desc) }; };
        const categories = [createCategory(0, "All"), createCategory(1, "Program Language"), createCategory(2, "IDE"), createCategory(3, "Framework")]
        function CreateKnowledge(categId, desc) { return { CategId: ko.observable(categId), Desc: ko.observable(desc) }; }
        const knowledge = [CreateKnowledge(1, "C#"), CreateKnowledge(1, "JavaScript"), CreateKnowledge(1, "TypeScript"), CreateKnowledge(1, "Php"),
        CreateKnowledge(2, "WebStorm"), CreateKnowledge(2, "PhpStorm"),
        CreateKnowledge(2, "Visual Studio Community"), CreateKnowledge(2, "Visual Studio Code"),
        CreateKnowledge(3, "Knockout.js"), CreateKnowledge(3, "jQuery"), CreateKnowledge(3, "Angular"), CreateKnowledge(3, "React"),
        CreateKnowledge(3, "Entity Framework"), CreateKnowledge(3, "ASP.NET")];
        // -------- Functionality
        this.Categories = ko.observableArray(categories);
        this.Knowledge = ko.observableArray(knowledge);
        this.KnockledgeToDisplay = ko.observableArray(knowledge);
        this.SelectedCategory = ko.observable(0); // Contains Category Id
        this.AddCategory = () => {
            debugger;
            let Category = window.prompt("Category name", "");
            if (!Category) return;
            let Ids = this.Categories().map(v => v.Id());
            let newId = Math.max(...Ids) + 1;
            this.Categories.push(createCategory(newId, Category));
        };
        this.SelectCategory = (categ) => {
            let id = categ.Id();
            this.SelectedCategory(id);
            let arr = !id ? this.Knowledge() : ko.utils.arrayFilter(this.Knowledge(), (item) => item.CategId() === id);
            this.KnockledgeToDisplay(arr);
        };
        this.AddKnockledge = (arr) => {
            let categId = this.SelectedCategory();
            if (!categId) {
                alert("first select category");
                return;
            }
            let categ = this.Categories().find(c => c.Id() === categId);
            let newKnowledge = window.prompt("Add knockledge to " + categ.Desc(), "");
            this.Knowledge.push(CreateKnowledge(categId, newKnowledge));
            this.SelectCategory(categ);
        };
        this.DeleteKnockledge = (knowledge) => {
            let categId = knowledge.CategId();
            let desc = knowledge.Desc();
            let newArr = ko.utils.arrayFilter(this.Knowledge(), (item) => item.Desc() !== desc);
            this.Knowledge(newArr);
            this.SelectCategory({ Id: ko.observable(categId) });
        };
        this.DeleteCategory = (category) => {
            let id = category.Id();
            let newKnowledge = ko.utils.arrayFilter(this.Knowledge(), (item) => item.CategId() !== id);
            let newCategories = ko.utils.arrayFilter(this.Categories(), (item) => item.Id() !== id);
            this.Knowledge(newKnowledge);
            this.Categories(newCategories);
            this.SelectCategory({ Id: ko.observable(0) });
        };
    };
    ko.applyBindings(new viewModel());
});