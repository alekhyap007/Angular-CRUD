import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { PostsResourceComponent } from './posts-resource.component';

describe('PostsResourceComponent', () => {
  let component: PostsResourceComponent;
  let fixture: ComponentFixture<PostsResourceComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ PostsResourceComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(PostsResourceComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
