;; Universal Constant Adjustment Contract

(define-map constants
  { name: (string-ascii 64) }
  { value: int }
)

(define-public (adjust-constant (name (string-ascii 64)) (new-value int))
  (ok (map-set constants { name: name } { value: new-value }))
)

(define-read-only (get-constant (name (string-ascii 64)))
  (default-to { value: 0 } (map-get? constants { name: name }))
)

