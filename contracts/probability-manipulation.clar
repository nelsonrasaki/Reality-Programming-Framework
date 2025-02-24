;; Probability Manipulation Contract

(define-map event-probabilities
  { event: (string-ascii 64) }
  { probability: uint }
)

(define-public (set-probability (event (string-ascii 64)) (probability uint))
  (ok (map-set event-probabilities { event: event } { probability: probability }))
)

(define-read-only (get-probability (event (string-ascii 64)))
  (default-to { probability: u50 } (map-get? event-probabilities { event: event }))
)

