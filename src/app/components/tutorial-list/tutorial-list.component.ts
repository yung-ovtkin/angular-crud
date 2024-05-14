import { Component,OnInit } from '@angular/core';
import { Tutorial } from 'src/app/models/tutorial.model';
import { TutorialService } from 'src/app/services/tutorial.service';

@Component({
  selector: 'app-tutorial-list',
  templateUrl: './tutorial-list.component.html',
  styleUrls: ['./tutorial-list.component.css']
})
export class TutorialListComponent implements OnInit {

  tutorials? : Tutorial[] | any;
  currentTutorial: Tutorial = {};
  currentIndex = -1;
  title = '';
  page = 1;
  count = 0;
  pageSize = 3;
  pageSizes = [3, 6, 9];
  constructor(private tutorialService: TutorialService){

  }
  ngOnInit(): void {
    this.retrieveTutorials();
    
  }
  getRequestParams(searchTitle: string, page: number, pageSize: number): any{
    let params: any = {};
    
    if(searchTitle){
      params[`title`] = searchTitle
    }
    if (page){
      params[`page`]= page -1
    }
    if (pageSize){
      params[`size`] = pageSize;

    }
    return params;

  }

  removeAllTutorials(): void {
    this.tutorialService.deleteAll()
    .subscribe({
      next: (res) =>{
        console.log(res);
        this.refreshList;

      },
      error: (e) => console.error(e)
    })
  }
  
  handlePageChange(event: number): void{
    this.page = event;
    this.retrieveTutorials();

  }
  handlePageSizeChange(event: any) : void{
    this.pageSize = event.target.value;
    this.page = 1;
    this.retrieveTutorials();

  }

  retrieveTutorials(): void{
    const params = this.getRequestParams(this.title, this.page, this.pageSize);
    
    this.tutorialService.getAll(params)
      .subscribe({
       next: (data:any) => {
          const {tutorials, totalItems} = data;
        this.tutorials =tutorials;
        this.count = totalItems;
        console.log(data);
        },
        error: (err) => {
          console.log(err)
        }
  });
  }

  // this.tutorialService.getAll()
    //   .subscribe({
    //     next: (data:any) =>{
    //       this.tutorials = data.tutorials;
    //       console.log(this.tutorials);

    //     },
    //     error: (e) => console.error(e),
    //   });

  refreshList(): void{
    this.retrieveTutorials();
    this.currentTutorial = {};
    this.currentIndex = -1;

  }

  setActiveTutorial(tutorial: Tutorial, index: number): void {
    this.currentTutorial = tutorial;
    this.currentIndex = index;
  }

  searchTitle(): void {
    this.currentTutorial = {};
    this.currentIndex = -1;
    this.tutorialService.findByTitle(this.title).subscribe({
      next: (data) => {
        if (Array.isArray(data)) {
          this.tutorials = data; // If data is already an array, assign it directly
        } else {
          this.tutorials = [data]; // If data is an object, wrap it in an array
        }
        console.log(data);
      },
      error: (e) => console.error(e),
    });
  }

}
