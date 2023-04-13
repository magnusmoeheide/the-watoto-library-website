import { getArticles, getNewestArticle, getArticlesByAuthor, getArticleSectionsByArticle } from './articles';
import { getAuthors, getAuthorById } from './authors';
import { getArticleSections } from './articleSections';
import { getWhatWeDo, updateWwd } from './whatWeDo';
import { getWwdSections, getWwdSectionsById, updateWwdSectionsById } from './wwdSections';
import { getTeam, updateTeam, getTeamById, deleteTeam, createTeam } from './team';
import { getOurGreatestNeeds, updateOurGreatestNeeds } from './ourGreatestNeeds';


export{
    getArticles, 
    getNewestArticle,
    getArticlesByAuthor,
    getArticleSectionsByArticle,
    
    getAuthors,
    getAuthorById, 

    getWhatWeDo,
    updateWwd,

    getArticleSections,

    getWwdSections,
    getWwdSectionsById,
    updateWwdSectionsById,

    getTeam,
    updateTeam,
    getTeamById,
    deleteTeam,
    createTeam,

    getOurGreatestNeeds,
    updateOurGreatestNeeds
}