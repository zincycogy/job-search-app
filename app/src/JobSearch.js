import {getCurrencySymbol, extractFormData} from './utils';
import {jobTemplate} from './template';

export class JobSearch {

  constructor(searchFormSelector, resultsContainerSelector, loadingElementSelector, contractElementSelector) {
    this.searchForm = document.querySelector(searchFormSelector);
    this.resultsContainer = document.querySelector(resultsContainerSelector);
    this.loadingElement = document.querySelector(loadingElementSelector);
    this.contractOnly = document.querySelector(contractElementSelector);
  }

  setCountryCode() {
    this.countryCode = 'gb';
    this.setCurrencySymbol();

    fetch('http://ip-api.com/json')
      .then(results => results.json())
      .then(results => {
        this.countryCode = results.countryCode.toLowerCase();
        this.setCurrencySymbol();
      });
  }

  setCurrencySymbol() {
    this.currencySymbol = getCurrencySymbol(this.countryCode);
  }

 /* setIsContract(){
    this.contractJobs = "";
   // var a = isContract.checked ? "checked" : "not checked";


  // ($('#mycheck').is(':checked'))?console.log('submit allow') : console.log('Not allow submit');

 this.contractOnly.addEventListener('change', function() {

      if (this.checked) {
        this.contractJobs = 1;
        console.log("Checkbox is checked.." + this.contractJobs);

      } else {
        this.contractJobs = 0;
        console.log("Checkbox is not checked.." + this.contractJobs);
      }
    });

  }*/



 configureFormListener() {
    this.searchForm.addEventListener('submit', (event) => {
    event.preventDefault();
    this.startLoading();
    this.resultsContainer.innerHTML = '';
    const { search, location, contractOnly } = extractFormData(this.searchForm);
    let contractJobs =  this.contractOnly.checked ? contractJobs = 1 : contractJobs = 0;
    fetch(`http://localhost:3000/?search=${search}&location=${location}&country=${this.countryCode}&contract=${contractJobs}`)
      .then(response => response.json())
      .then(({ results }) => {
        this.stopLoading();
        return results
          .map(job => jobTemplate(job, this.currencySymbol))
          .join('');
      })
      .then(jobs => this.resultsContainer.innerHTML = jobs)
      .catch(() => this.stopLoading());
    });
  }

  startLoading() {
    this.loadingElement.classList.add('loading');
  }

  stopLoading() {
    this.loadingElement.classList.remove('loading');
  }
}