import { getArticles, getNewestArticle, updateArticles, deleteArticles, createArticles, getNewestArticles} from './articles';
import { getAuthors, getAuthorById } from './authors';
import { getArticleSections, getArticleSectionsById, updateArticleSectionsById, deleteArticleSectionsById, createArticleSectionsById } from './articleSections';
import { getWhatWeDo, updateWwd, createWwd, deleteWwd } from './whatWeDo';
import { getWwdSections, getWwdSectionsById, updateWwdSectionsById, createWwdSectionsById, deleteWwdSectionsById } from './wwdSections';
import { getTeam, updateTeam, getTeamById, deleteTeam, createTeam } from './team';
import { getOurGreatestNeeds, updateOurGreatestNeeds } from './ourGreatestNeeds';


export{
    getArticles, 
    getNewestArticle,
    updateArticles,
    deleteArticles,
    createArticles,
    getNewestArticles,

    getArticleSections,
    getArticleSectionsById,
    updateArticleSectionsById,
    deleteArticleSectionsById,
    createArticleSectionsById,
    
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