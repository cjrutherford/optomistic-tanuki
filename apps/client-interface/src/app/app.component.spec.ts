import { TestBed, ComponentFixture } from '@angular/core/testing';
import { Router, NavigationEnd, provideRouter } from '@angular/router';
import { BehaviorSubject, from, of } from 'rxjs';
import { AppComponent } from './app.component';
import { ThemeService } from './theme/theme.service';
import { AuthStateService } from './state/auth-state.service';
import { ProfileService } from './profile.service';
import { MatSidenavModule } from '@angular/material/sidenav';
import { MatToolbarModule } from '@angular/material/toolbar';
import { MatListModule } from '@angular/material/list';
import { MatIconModule } from '@angular/material/icon';

jest.mock('./theme/theme.service');
jest.mock('./state/auth-state.service');
jest.mock('./profile.service');
jest.mock('@angular/router');

describe('AppComponent', () => {
  let component: AppComponent;
  let fixture: ComponentFixture<AppComponent>;
  let mockThemeService: jest.Mocked<ThemeService>;
  let mockAuthStateService: jest.Mocked<AuthStateService>;
  let mockProfileService: jest.Mocked<ProfileService>;
  let mockRouter: Router;
  let themeSubject: BehaviorSubject<string>;

  beforeEach(async () => {
    themeSubject = new BehaviorSubject<string>('dark');

    mockThemeService = {
      theme$: jest.fn().mockReturnValue(themeSubject.asObservable()),
      setTheme: jest.fn(),
      setAccentColor: jest.fn(),
      getTheme: jest.fn(),
      getAccentColor: jest.fn(),
      themeColors$: of([]),
    } as unknown as jest.Mocked<ThemeService>;

    mockAuthStateService = {
      isAuthenticated: false,
    } as jest.Mocked<AuthStateService>;

    mockProfileService = {
      getAllProfiles: jest.fn(),
      selectProfile: jest.fn(),
      currentUserProfiles: jest.fn(),
      allProfiles: jest.fn(),
      currentUserProfile: jest.fn(),
      getCurrentUserProfiles: jest.fn(),
      getDisplayProfile: jest.fn(),
    } as unknown as jest.Mocked<ProfileService>;


    await TestBed.configureTestingModule({
      imports: [
        MatSidenavModule,
        MatToolbarModule,
        MatListModule,
        MatIconModule,
        AppComponent,
      ],
      declarations: [],
      providers: [
        { provide: ThemeService, useValue: mockThemeService },
        { provide: AuthStateService, useValue: mockAuthStateService },
        { provide: ProfileService, useValue: mockProfileService },
        provideRouter([]),
      ],
    }).compileComponents();

    fixture = TestBed.createComponent(AppComponent);
    component = fixture.componentInstance;
    mockRouter = TestBed.inject(Router);
    fixture.detectChanges();
  });

  afterEach(() => {
    jest.clearAllMocks();
    fixture?.destroy();
    TestBed.resetTestingModule();
  })

  it('should create the component', () => {
    expect(component).toBeTruthy();
  });

  it('should set backgroundGradient based on theme$', () => {
    themeSubject.next('dark');
    fixture.detectChanges();
    expect(component.backgroundGradient).toBe('background-gradient-dark');
  });

  it('should navigate to /login if not authenticated and on root URL', async () => {
    jest.spyOn(mockAuthStateService, 'isAuthenticated', 'get').mockReturnValue(false);
    mockProfileService.getAllProfiles.mockResolvedValue(undefined);
    
    component.ngOnInit();
    await fixture.whenStable();
    expect(mockRouter.navigate).toHaveBeenCalledWith(['/login']);
  });

  it('should toggle navigation if authenticated', () => {
    jest.spyOn(mockAuthStateService, 'isAuthenticated', 'get').mockReturnValue(true);
    component.isNavExpanded = false;

    component.toggleNav();
    expect(component.isNavExpanded).toBe(true);

    component.toggleNav();
    expect(component.isNavExpanded).toBe(false);
  });

  it('should not toggle navigation if not authenticated', () => {
    jest.spyOn(mockAuthStateService, 'isAuthenticated', 'get').mockReturnValue(false);
    component.isNavExpanded = false;

    component.toggleNav();
    expect(component.isNavExpanded).toBe(false);
  });
});