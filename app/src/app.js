import { JobSearch } from './JobSearch';

const jobSearch = new JobSearch('#search-form', '.result-container', '.loading-element', '#contractOnly');
jobSearch.setCountryCode();
//jobSearch.setIsContract();
jobSearch.configureFormListener();
