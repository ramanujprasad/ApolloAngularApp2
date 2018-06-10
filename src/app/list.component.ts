import { Component, OnInit } from '@angular/core';
import { Apollo } from 'apollo-angular';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';

import gql from 'graphql-tag';

import { Post, Query } from './types';

@Component({
  selector: 'app-list',
  styleUrls: ['./upvoter.component.css'],
  templateUrl: './upvoter.component.html'
})
export class ListComponent implements OnInit {
  posts: Observable<Post[]>;
  constructor(private apollo: Apollo) {}

  ngOnInit() {
    this.posts = this.apollo.watchQuery<Query>({
      query: gql`
        query allPosts {
          posts {
            id
            title
            votes
            author {
              id
              firstName
              lastName
            }
          }
        }
      `,
    })
      .valueChanges
      .pipe(
        map(result => result.data.posts)
      );
  }
}