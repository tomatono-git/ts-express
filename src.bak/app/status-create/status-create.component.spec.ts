import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { StatusCreateComponent } from './status-create.component';
import { HttpClientTestingModule } from '@angular/common/http/testing';

describe('StatusCreateComponent', () => {
    let component: StatusCreateComponent;
    let fixture: ComponentFixture<StatusCreateComponent>;

    beforeEach(async(() => {
        TestBed.configureTestingModule({
            imports: [HttpClientTestingModule],
            declarations: [StatusCreateComponent]
        })
            .compileComponents();
    }));

    beforeEach(() => {
        fixture = TestBed.createComponent(StatusCreateComponent);
        component = fixture.componentInstance;
        fixture.detectChanges();
    });

    it('should create', () => {
        expect(component).toBeTruthy();
    });
});
