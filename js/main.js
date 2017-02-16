var ACCESS_TOKEN = 'a3e3a2964f9034520dbef9e01157848faadf4f53bfefeebdd40f96b01ee289e5';
var SPACE_ID = 'ubz4l0xsylnf';

var contentfulClient = contentful.createClient({
    accessToken: ACCESS_TOKEN,
    space: SPACE_ID
});

var vm = new Vue({
    el: '#project-content',
    data: {
        projects: [],
        loading: true
    },
    methods: {
        getData: function () {
            var self = this;
            contentfulClient.getEntries({
                content_type: 'project'
            }).then(function(entries) {
                var items = entries.items;
                for (var item in items) {
                    items[item].fields.description = marked(items[item].fields.description);
                }
                self.projects = items;
            });
            self.loading = false;
            console.log(this.projects)
        }
    },
    created: function () {
        setTimeout(this.getData, 3000);
    }
});