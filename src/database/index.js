import { getArticles, getNewestArticle, getArticlesByAuthor, getArticleSectionsByArticle } from './articles';
import { getAuthors, getAuthorById } from './authors';
import { getArticleSections } from './articleSections';
import { getWhatWeDo } from './whatWeDo';
import { getWwdSections } from './wwdSections';
import { getTeam } from './team';
import { getOurGreatestNeeds } from './ourGreatestNeeds';


export{
    getArticles, 
    getNewestArticle,
    getArticlesByAuthor,
    getArticleSectionsByArticle,
    
    getAuthors,
    getAuthorById, 

    getWhatWeDo,

    getArticleSections,
    getWwdSections,

    getTeam,
    getOurGreatestNeeds
}