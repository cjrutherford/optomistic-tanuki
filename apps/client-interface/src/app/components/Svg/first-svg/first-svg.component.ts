import { CommonModule } from "@angular/common";
import { Component, OnInit, OnDestroy, Renderer2, ElementRef } from "@angular/core";
import { ThemeService } from "../../../theme/theme.service";
import { Subscription } from "rxjs";

@Component({
    standalone: true,
    selector: 'app-first-svg',
    templateUrl: './first-svg.component.html',
    styleUrls: ['./first-svg.component.scss'],
    imports: [CommonModule],
    providers: [ThemeService]
})
export class FirstSvgComponent implements OnInit, OnDestroy {
    sub: Subscription;
    constructor(
        private readonly theme: ThemeService,
        private renderer: Renderer2,
        private el: ElementRef
    ) {}

    ngOnInit() {
        this.sub = this.theme.themeColors$.subscribe((colors) => {
            this.renderer.setStyle(this.el.nativeElement, '--fill-color', colors.accent);
        });
    }

    ngOnDestroy() {
        this.sub.unsubscribe();
    }
}