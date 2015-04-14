/**
 * Created by Magador on 14/04/2015.
 */

document.addEventListener('DOMContentLoaded', function() {
    console.info('DOM Content Loaded');

    var buttons = document.getElementsByClassName('data-link');
    for(var i = 0; i < buttons.length; i++) {
        buttons.item(i).addEventListener('click', getMedias);
    }
});

var getMedias = function(event) {
    event.stopPropagation();
    event.preventDefault();

    console.log(event.target.dataset.url);

    var articleList = document.getElementsByClassName('article-list')[0];

    microAjax(event.target.dataset.url, function(res) {
        setArticleList(articleList, event.target.textContent, JSON.parse(res).data.movies);
    });
};

var setArticleList = function(articleList, title, articles) {
    document.getElementsByClassName('content-title')[0].textContent = title;

    // Input model
    var articleVisible = document.createElement('input');
    articleVisible.className = 'article-visible';
    //articleVisible.id = 'article'+ index;
    articleVisible.setAttribute('type', 'checkbox');
    articleVisible.setAttribute('name', 'more');
    articleVisible.setAttribute('autocomplete', 'off');

    // Article-item model
    var articleItem = document.createElement('div');
    articleItem.className = 'article-item';

    // Article label model
    var articleLabel = document.createElement('label');
    articleLabel.className = 'article-label';
    //articleLabel.setAttribute('for', 'article'+ index);

    // Article model
    var article = document.createElement('article');
    article.className = 'article';

    // Article header model
    var articleHeader = document.createElement('div');
    articleHeader.className = 'article-header';

    // Article title model
    var articleTitle = document.createElement('h4');
    articleTitle.className = 'article-title';
    //articleTitle.textContent = 'value';

    // Article year model
    var articleYear = document.createElement('time');
    articleYear.className = 'article-year';
    //articleYear.textContent = 'value';

    // Article picture model
    var articlePicture = document.createElement('img');
    articlePicture.className = 'article-picture';
    //articlePicture.src = "http://example.com/img.png";

    var articleSynopsis = document.createElement('p');
    articleSynopsis.className = 'article-synopsis';
    //articleSynopsis.textContent = "";

    while (articleList.firstChild) {
        articleList.removeChild(articleList.firstChild);
    }

    articles.forEach(function(value, index) {

        var _articleVisible = articleVisible.cloneNode(true);
        _articleVisible.id = 'article'+ index;

        var _articleItem = articleItem.cloneNode(true);

        var _articleLabel = articleLabel.cloneNode(true);
        _articleLabel.setAttribute('for', 'article'+ index);

        var _article = article.cloneNode(true);

        var _articleHeader = articleHeader.cloneNode(true);

        var _articleTitle = articleTitle.cloneNode(true);
        _articleTitle.textContent = value.title;

        var _articleYear = articleYear.cloneNode(true);
        _articleYear.textContent = value.year;

        var _articlePicture = articlePicture.cloneNode(true);
        _articlePicture.src = value.medium_cover_image;

        var _articleSynopsis = articleSynopsis.cloneNode(true);
        _articleSynopsis.textContent = "";

        _articleHeader.appendChild(_articleTitle);
        _articleHeader.appendChild(_articleYear);
        _article.appendChild(_articleHeader);
        _article.appendChild(_articlePicture);
        _article.appendChild(_articleSynopsis);
        _articleItem.appendChild(_articleLabel);
        _articleItem.appendChild(_article);
        articleList.appendChild(_articleVisible);
        articleList.appendChild(_articleItem);

    });

};