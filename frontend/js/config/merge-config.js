/*

Configuration for the merge function


This configuration manages what and how fields are copied from other record to the preferred record while merging a record.

Each field has a selector. A dot (.) is a wildcard character, so "08." means 080,081,082,...,089. Only the first selector
matching the field is used.

Only fields that have been configured are considered to be moved from other record to the preferred record.

Possible actions are:

copy
 Copies field from other, if it's missing from the preferred. Normally the field-wise comparison is made using normalized subfield sets. If other set is a proper subset, then
 the fields are considered identical.


selectBetter
 Chooses better field from 2 records. Will throw error if record has multiple of the configured field, so it's (often) not
 usable for repeatable fields. Field in other record is considered better only if it's proper superset of the field in preferred.
 Otherwise the field in preferred is used.

selectBetter has an extra option: comparator. Use comparator to use different equality function for subfield contents.
 Only possible value currently is "substring", which makes the subfield comparisons with substring equality instead of normal equality
 (that is, if subfieldA is substring of subfieldB OR subfieldB is substring of subfieldA, then they are considered equal)
 The comparator functions must be reflexive, symmetrical but need not to be transitive.
 If substring comparator is used, then the field that has more longer fields is selected. Field from preferred record is selected,
 if both fields have equal amounts of longer subfields.

 onlyIfMissing: boolean
 if onlyIfMissing is set, then field is copied from other record only if it's missing from the preferred record. So it defaults to field
 in preferred record, but if it's missing, then the field in other record will be used.


copy action may also have some options, which are:

compareWithout (array of subfield codes)
 When comparing fields in other and preferred, the similarity comparison of fields is done without using the listed subfields.
 If the fields are merged, then the combined unique list of compareWithout -subfields from both fields will be added to the merged field.

combine (array of subfield codes)
 combine multiple different subfields with same code into a single subfield wrapped by [].
 So for example c20mk and c25mk becomes c[20mk, 25mk]

compareWithoutIndicators (true|false)
 Field similarity comparison is made without considering indicators. The merged field will contain the indicators
 from either source field, preferring items that have indicators set.

mustBeIdentical (true|false)
 Normally the field-wise comparison is made using normalized subfield sets. If other set is
 a proper subset, then the fields are considered identical.

 This behaviour can be changed with mustBeIdentical option, which skips the subset comparison and
 requires the fields have identical sets of subfields (subfield values are still normalized)

More info @natlibfi/marc-record-merge
*/
/*eslint-disable quotes*/

module.exports = {
  fields: {
    '006': {'action': 'controlfield'},
    '007': {'action': 'controlfield'},
    "008": {
      "action": "mergeControlfield",
      "options": {
        "actions": [
          {
            "formats": ["BK", "CF", "CR", "MU", "MX", "VM", "MP"],
            "range": [15, 17],
            "significantCaret": false,
            "type": "selectNonEmpty"
          },
          {
            "formats": ["BK", "CF", "CR", "MU", "MX", "VM", "MP"],
            "range": [35, 37],
            "significantCaret": false,
            "type": "selectNonEmpty"
          },
          {
            "formats": ["BK"],
            "range": [18, 21],
            "significantCaret": true,
            "type": "combine"
          },
          {
            "formats": ["BK", "CF", "MU", "VM"],
            "range": [22, 22],
            "significantCaret": true,
            "type": "selectNonEmpty"
          },
          {
            "formats": ["BK", "CF", "CR", "MU", "MX"],
            "range": [23, 23],
            "significantCaret": true,
            "type": "selectNonEmpty"
          },
          {
            "formats": ["MP"],
            "range": [29, 29],
            "significantCaret": true,
            "type": "selectNonEmpty"
          },
          {
            "formats": ["BK"],
            "range": [24, 27],
            "significantCaret": false,
            "type": "combine"
          },
          {
            "formats": ["BK", "CF", "CR", "MP", "VM"],
            "range": [28, 28],
            "significantCaret": true,
            "type": "selectNonEmpty"
          },
          {
            "formats": ["BK", "CR", "VM"],
            "range": [29, 29],
            "significantCaret": false,
            "type": "selectNonEmpty"
          },
          {
            "formats": ["BK"],
            "range": [30, 30],
            "significantCaret": false,
            "type": "selectNonEmpty"
          },
          {
            "formats": ["BK", "MP"],
            "range": [31, 31],
            "significantCaret": false,
            "type": "selectNonEmpty"
          },
          {
            "formats": ["BK"],
            "range": [33, 33],
            "significantCaret": false,
            "type": "selectNonEmpty"
          },
          {
            "formats": ["MU"],
            "range": [30, 31],
            "significantCaret": true,
            "type": "selectNonEmpty"
          },
          {
            "formats": ["BK"],
            "range": [34, 34],
            "significantCaret": true,
            "type": "selectNonEmpty"
          },
          {
            "formats": ["CR"],
            "range": [18, 18],
            "significantCaret": true,
            "type": "selectNonEmpty"
          },
          {
            "formats": ["CR"],
            "range": [19, 19],
            "significantCaret": false,
            "type": "selectNonEmpty"
          },
          {
            "formats": ["CR"],
            "range": [21, 21],
            "significantCaret": true,
            "type": "selectNonEmpty"
          },
          {
            "formats": ["CR"],
            "range": [22, 22],
            "significantCaret": true,
            "type": "selectNonEmpty"
          },
          {
            "formats": ["CR"],
            "range": [24, 24],
            "significantCaret": true,
            "type": "selectNonEmpty"
          },
          {
            "formats": ["CR"],
            "range": [25, 27],
            "significantCaret": true,
            "type": "selectNonEmpty"
          },
          {
            "formats": ["CR"],
            "range": [33, 33],
            "significantCaret": true,
            "type": "selectNonEmpty"
          },
          {
            "formats": ["CR"],
            "range": [34, 34],
            "significantCaret": false,
            "type": "selectNonEmpty"
          },
          {
            "formats": ["MP"],
            "range": [18, 21],
            "significantCaret": true,
            "type": "combine"
          },
          {
            "formats": ["MP"],
            "range": [25, 25],
            "significantCaret": false,
            "type": "selectNonEmpty"
          },
          {
            "formats": ["MP"],
            "range": [33, 34],
            "significantCaret": true,
            "type": "selectNonEmpty"
          },
          {
            "formats": ["MU"],
            "range": [18, 19],
            "significantCaret": false,
            "type": "selectNonEmpty"
          },
          {
            "formats": ["MU"],
            "range": [20, 20],
            "significantCaret": false,
            "type": "selectNonEmpty"
          },
          {
            "formats": ["MU"],
            "range": [21, 21],
            "significantCaret": true,
            "type": "selectNonEmpty"
          },
          {
            "formats": ["MU"],
            "range": [24, 29],
            "significantCaret": true,
            "type": "selectNonEmpty"
          },
          {
            "formats": ["MU"],
            "range": [33, 33],
            "significantCaret": true,
            "type": "selectNonEmpty"
          },
          {
            "formats": ["VM"],
            "range": [18, 20],
            "significantCaret": false,
            "type": "selectNonEmpty"
          },
          {
            "formats": ["VM"],
            "range": [33, 33],
            "significantCaret": false,
            "type": "selectNonEmpty"
          },
          {
            "formats": ["VM"],
            "range": [34, 34],
            "significantCaret": false,
            "type": "selectNonEmpty"
          },
        ]
      }
    },
    "010": {"action": "copy", "options": {"compareWithout": ["9"]}},
    "014": {"action": "copy", "options": {"compareWithout": ["9"]}},
    "015": {"action": "copy", "options": {"compareWithout": ["9"]}},
    "019": {"action": "copy", "options": {"compareWithout": ["9"]}},
    "020": {"action": "copy", "options": {"compareWithout": ["z", "c", "q", "9"], "combine": ["c"]}},
    "022": {"action": "copy", "options": {"compareWithout": ["9"], "compareWithoutIndicators": true}},
    "024": {"action": "copy", "options": {"compareWithout": ["z", "c", "q", "9"], "combine": ["c"]}},
    "027": {"action": "copy", "options": {"compareWithout": ["z", "c", "q", "9"], "combine": ["c"]}},
    "028": {"action": "copy", "options": {"compareWithout": ["q", "9"], "compareWithoutIndicators": true}},
    "031": {"action": "copy", "options": {"compareWithout": ["9"]}},
    "033": {"action": "copy", "options": {"compareWithout": ["9"]}},
    "035": {"action": "copy", "options": {"compareWithout": ["9"]}},
    "039": {"action": "copy", "options": {"compareWithout": ["9"]}},
    "041": {"action": "selectBetter", 'options': {'onlyIfMissing': true, 'skipOnMultiple': true}},
    "042": {"action": "copy"},
    "045": {"action": "copy", "options": {"compareWithout": ["9"]}},
    "049": {"action": "copy", "options": {"compareWithout": ["9"]}},
    "050": {"action": "copy", "options": {"compareWithout": ["9"], 'mustBeIdentical': true}},
    "060": {"action": "copy", "options": {"compareWithout": ["9"], 'mustBeIdentical': true}},
    "072": {"action": "copy", "options": {"compareWithout": ["9"]}},
    "08.": {"action": "copy", "options": {"compareWithout": ["9"], 'mustBeIdentical': true}},
    "130": {"action": "copy", "options": {"compareWithout": ["9"], 'mustBeIdentical': true, transformOnInequality: {'tag': '930'}}},

    "210": {"action": "copy", "options": {"compareWithout": ["9"]}},
    "220": {"action": "copy", "options": {"compareWithout": ["9"]}},
    "240": {"action": "copy", "options": {"compareWithout": ["9"], 'mustBeIdentical': true, transformOnInequality: {'tag': '940'}}},
    "242": {"action": "copy", "options": {"compareWithout": ["9"]}},
    "243": {"action": "selectBetter", "options": {'skipOnMultiple': true}}, // ei-toistettava -- TODO: testataan.
    "245": {"action": "selectBetter", "options": {"comparator": "substring"}},
    "246": {"action": "copy", "options": {"compareWithout": ["9"]}},
    "247": {"action": "copy", "options": {"compareWithout": ["9"]}},
    "250": {"action": "selectBetter", "options": {"requireFieldInBoth": true, 'skipOnMultiple': true}},
    "254": {"action": "selectBetter", "options": {"requireFieldInBoth": true, 'skipOnMultiple': true}},
    "255": {"action": "copy", "options": {"compareWithout": ["9"]}},
    "256": {"action": "selectBetter", "options": {"requireFieldInBoth": true}},
    "257": {"action": "copy", "options": {"compareWithout": ["9"]}},
    "258": {"action": "copy", "options": {"compareWithout": ["9"]}},
    "260": {"action": "copy", "options": {"compareWithout": ["9"]}},
    "263": {"action": "copy", "options": {"compareWithout": ["9"]}},
    "264": {"action": "copy", "options": {"compareWithout": ["9"]}},
    "270": {"action": "copy", "options": {"compareWithout": ["9"]}},

    "300": {"action": "selectBetter", "options": {"comparator": "substring", 'skipOnMultiple': true}}, // default comparator is equality (with normalizations)
    "306": {"action": "selectBetter", "options": {'onlyIfMissing': true, 'skipOnMultiple': true}},
    "307": {"action": "copy", "options": {"compareWithout": ["9"]}},
    "310": {"action": "copy", "options": {"compareWithout": ["9"]}},
    "321": {"action": "copy", "options": {"compareWithout": ["9"]}},
    "336": {"action": "selectBetter", 'options': {'onlyIfMissing': true, 'skipOnMultiple': true}},
    "337": {"action": "selectBetter", 'options': {'onlyIfMissing': true, 'skipOnMultiple': true}},
    "338": {"action": "selectBetter", 'options': {'onlyIfMissing': true, 'skipOnMultiple': true}},
    "340": {"action": "copy", "options": {"compareWithout": ["9"]}},
    "342": {"action": "copy", "options": {"compareWithout": ["9"]}},
    "343": {"action": "copy", "options": {"compareWithout": ["9"]}},
    "344": {"action": "copy", "options": {"compareWithout": ["9"]}},
    "345": {"action": "copy", "options": {"compareWithout": ["9"]}},
    "346": {"action": "copy", "options": {"compareWithout": ["9"]}},
    "347": {"action": "copy", "options": {"compareWithout": ["9"]}},
    "348": {"action": "copy", "options": {"compareWithout": ["9"]}},
    "351": {"action": "copy", "options": {"compareWithout": ["9"]}},
    "352": {"action": "copy", "options": {"compareWithout": ["9"]}},
    "355": {"action": "copy", "options": {"compareWithout": ["9"]}},
    "357": {"action": "selectBetter", 'options': {'onlyIfMissing': true, 'skipOnMultiple': true}},
    "362": {"action": "copy", "options": {"compareWithout": ["9"]}},
    "363": {"action": "copy", "options": {"compareWithout": ["9"]}},
    "365": {"action": "copy", "options": {"compareWithout": ["9"]}},
    "366": {"action": "copy", "options": {"compareWithout": ["9"]}},
    "370": {"action": "copy", "options": {"compareWithout": ["9"]}},
    "377": {"action": "copy", "options": {"compareWithout": ["9"]}},
    "380": {"action": "copy", "options": {"compareWithout": ["9"]}},
    "381": {"action": "copy", "options": {"compareWithout": ["9"]}},
    "382": {"action": "copy", "options": {"compareWithout": ["9"]}},
    "383": {"action": "copy", "options": {"compareWithout": ["9"]}},
    "384": {"action": "selectBetter", 'options': {'onlyIfMissing': true, 'skipOnMultiple': true}},
    "385": {"action": "copy", "options": {"compareWithout": ["9"]}},
    "386": {"action": "copy", "options": {"compareWithout": ["9"]}},
    "388": {"action": "copy", "options": {"compareWithout": ["9"]}},

    "490": {"action": "copy", "options": {"compareWithout": ["9"]}},

    "5..": {"action": "copy", "options": {"compareWithout": ["9"]}},

    "600": {"action": "copy", "options": {"compareWithout": ["9", "e", "4", "0"], "mustBeIdentical": true}},
    "610": {"action": "copy", "options": {"compareWithout": ["9", "e", "4", "0"], "mustBeIdentical": true}},
    "611": {"action": "copy", "options": {"compareWithout": ["9", "e", "4", "0"], "mustBeIdentical": true}},
    "630": {"action": "copy", "options": {"compareWithout": ["9"], "mustBeIdentical": true}},
    "648": {"action": "copy", "options": {"compareWithout": ["9"], "mustBeIdentical": true}},
    "65.": {"action": "copy", "options": {"compareWithout": ["9"], "mustBeIdentical": true}},
    "662": {"action": "copy", "options": {"compareWithout": ["9"], "mustBeIdentical": true}},

    "700": {"action": "copy", "options": {"compareWithout": ["9", "e", "4", "0"]}},
    "710": {"action": "copy", "options": {"compareWithout": ["9", "e", "4", "0"]}},
    "711": {"action": "copy", "options": {"compareWithout": ["9", "e", "4", "0"]}},
    "720": {"action": "copy", "options": {"compareWithout": ["9", "e", "4"]}},
    "730": {"action": "copy", "options": {"compareWithout": ["9"]}},
    "740": {"action": "copy", "options": {"compareWithout": ["9"]}},
    "751": {"action": "copy", "options": {"compareWithout": ["9"]}},
    "752": {"action": "copy", "options": {"compareWithout": ["9"]}},
    "753": {"action": "copy", "options": {"compareWithout": ["9"]}},
    "754": {"action": "copy", "options": {"compareWithout": ["9"]}},
    "758": {"action": "copy", "options": {"compareWithout": ["9"]}},
    "76.": {"action": "copy", "options": {"compareWithout": ["9"]}},
    "77.": {"action": "copy", "options": {"compareWithout": ["9"]}},
    "78.": {"action": "copy", "options": {"compareWithout": ["9"]}},

    "800": {"action": "copy", "options": {"compareWithout": ["9"]}},
    "810": {"action": "copy", "options": {"compareWithout": ["9"]}},
    "811": {"action": "copy", "options": {"compareWithout": ["9"]}},
    "830": {"action": "copy", "options": {"compareWithout": ["9"]}},

    "84.": {"action": "copy", "options": {"compareWithout": ["9"]}},
    "85.": {"action": "copy", "options": {"compareWithout": ["9"]}},
    "86.": {"action": "copy", "options": {"compareWithout": ["9"]}},
    "87.": {"action": "copy", "options": {"compareWithout": ["9"]}},

    "882": {"action": "copy", "options": {"compareWithout": ["9"]}},
    "883": {"action": "copy", "options": {"compareWithout": ["9"]}},
    "884": {"action": "copy", "options": {"compareWithout": ["9"]}},
    "886": {"action": "copy", "options": {"compareWithout": ["9"]}},
    "887": {"action": "copy", "options": {"compareWithout": ["9"]}},

    "9..": {"action": "copy", "options": {"compareWithout": ["9"]}}
  }
};

/*eslint-enable quotes*/
