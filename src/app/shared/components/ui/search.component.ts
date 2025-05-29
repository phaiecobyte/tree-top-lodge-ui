import { Component } from "@angular/core";
import { CommonModule } from '@angular/common'; 
import { FormsModule } from '@angular/forms'; 

@Component({
    selector:'app-search',
    imports:[CommonModule,FormsModule],
    template:`
    <div class="container">
        <div class="row">
            <div class="col-sm-12 col-lg-4">
                <form>
                    <div class="form-group mb-3 d-flex">
                        <input type="text" class="form-control me-1 border-primary" placeholder="Search" aria-label="Search" aria-describedby="basic-addon1">
                        <button class="btn btn-outline-primary" type="submit">Search</button>
                    </div>
                </form>
            </div>
        </div>
    </div>
    `,
    styles:[``]
})

export class SearchComponent
{

}