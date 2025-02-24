;; Causal Relationship Redefinition Contract

(define-map causal-relationships
  { cause: (string-ascii 64), effect: (string-ascii 64) }
  { probability: uint }
)

(define-public (define-relationship (cause (string-ascii 64)) (effect (string-ascii 64)) (probability uint))
  (ok (map-set causal-relationships { cause: cause, effect: effect } { probability: probability }))
)

(define-read-only (get-relationship (cause (string-ascii 64)) (effect (string-ascii 64)))
  (default-to { probability: u0 } (map-get? causal-relationships { cause: cause, effect: effect }))
)

