import { getArticles, getNewestArticle, getArticlesByAuthor} from './articles';
import { getAuthors, getAuthorById } from './authors';
import { getArticleSections, getArticleSectionsById } from './articleSections';
import { getWhatWeDo, updateWwd, createWwd, deleteWwd } from './whatWeDo';
import { getWwdSections, getWwdSectionsById, updateWwdSectionsById, createWwdSectionsById, deleteWwdSectionsById } from './wwdSections';
import { getTeam, updateTeam, getTeamById, deleteTeam, createTeam } from './team';
import { getOurGreatestNeeds, updateOurGreatestNeeds } from './ourGreatestNeeds';


export{
    getArticles, 
    getNewestArticle,
    getArticlesByAuthor,

    getArticleSections,
    getArticleSectionsById,
    
    getAuthors,
    getAuthorById, 

    getWhatWeDo,
    updateWwd,
    createWwd,
    deleteWwd,

    getWwdSections,
    getWwdSectionsById,
    updateWwdSectionsById,
    createWwdSectionsById,
    deleteWwdSectionsById,

    getTeam,
    updateTeam,
    getTeamById,
    deleteTeam,
    createTeam,

    getOurGreatestNeeds,
    updateOurGreatestNeeds
}