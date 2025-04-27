import { Component } from "@angular/core";

@Component({
    selector: "app-footer",
    template: `
        <footer class="bg-dark text-light py-4">
            <div class="container">
                <div class="row text-center text-md-start">
                    <!-- Accommodation Section -->
                    <div class="col-md-4 mb-4">
                        <h5 class="text-uppercase fw-bold text-light">Accommodation</h5>
                        <ul class="list-unstyled">
                            <li>Deluxe Room</li>
                            <li>Family Suite</li>
                            <li>Treehouse Villa</li>
                            <li>Honeymoon Cottage</li>
                        </ul>
                    </div>

                    <!-- Tour Package Section -->
                    <div class="col-md-4 mb-4">
                        <h5 class="text-uppercase fw-bold text-light">Tour Package</h5>
                        <ul class="list-unstyled">
                            <li>Adventure Package</li>
                            <li>Relaxation Package</li>
                            <li>Family Fun Package</li>
                            <li>Honeymoon Package</li>
                        </ul>
                    </div>

                    <!-- Social Media Section -->
                    <div class="col-md-4 mb-4">
                        <h5 class="text-uppercase fw-bold text-light">Follow Us</h5>
                        <p>Stay connected with us on social media!</p>
                        <div class="d-flex justify-content-center justify-content-md-start gap-3">
                            <a href="#" class="text-light" aria-label="Facebook">
                                <i class="bi bi-facebook fs-4"></i>
                            </a>
                            <a href="#" class="text-light" aria-label="Instagram">
                                <i class="bi bi-instagram fs-4"></i>
                            </a>
                            <a href="#" class="text-light" aria-label="Twitter">
                                <i class="bi bi-twitter fs-4"></i>
                            </a>
                        </div>
                    </div>
                </div>

                <hr class="bg-light" />

                <!-- Footer Bottom -->
                <div class="row text-center">
                    <div class="col-12">
                        <p class="mb-0">&copy; 2025 Tree Top Lodge. All rights reserved.</p>
                        <p class="mb-0">
                            Follow us on:
                            <a href="#" class="text-light">Facebook</a> |
                            <a href="#" class="text-light">Instagram</a> |
                            <a href="#" class="text-light">Twitter</a>
                        </p>
                    </div>
                </div>
            </div>
        </footer>
    `,
    styles: [
        `
            footer {
                font-size: 0.9rem;
            }
            footer a {
                text-decoration: none;
            }
            footer a:hover {
                text-decoration: underline;
            }
        `,
    ],
})
export class FooterComponent {
    constructor() {}
}