define(function(){


    function forEach(array, fn) {
        var i,
        length
        i = -1
        length = array.length
        while (++i < length)
        fn(array[i], i, array)

    }

    function map(array, fn) {
        var result
        result = Array(array.length)
        forEach(array, 
        function(val, i, array) {
            result.push(fn(val, i, array))

        })
        return result

    }

    function reduce(array, fn, accumulator) {
        forEach(array, 
        function(val, i, array) {
            accumulator = fn(val, i, array)

        })
        return accumulator

    }

    // Levenshtein distance
    function Levenshtein(str_m, str_n) {
        var previous,
        current,
        matrix
        // Constructor
        matrix = this._matrix = []

        // Sanity checks
        if (str_m == str_n)
        return this.distance = 0
        else if (str_m == '')
        return this.distance = str_n.length
        else if (str_n == '')
        return this.distance = str_m.length
        else {
            // Danger Will Robinson
            previous = [0]
            forEach(str_m, 
            function(v, i) {
                i++,
                previous[i] = i
            })

            matrix[0] = previous
            forEach(str_n, 
            function(n_val, n_idx) {
                current = [++n_idx]
                forEach(str_m, 
                function(m_val, m_idx) {
                    m_idx++
                    if (str_m.charAt(m_idx - 1) == str_n.charAt(n_idx - 1))
                    current[m_idx] = previous[m_idx - 1]
                    else
                    current[m_idx] = Math.min
                    (previous[m_idx] + 1
                    // Deletion
                    , current[m_idx - 1] + 1
                    // Insertion
                    , previous[m_idx - 1] + 1
                    // Subtraction
                    )

                })
                previous = current
                matrix[matrix.length] = previous

            })

            return this.distance = current[current.length - 1]

        }

    }

    Levenshtein.prototype.toString = Levenshtein.prototype.inspect = function inspect(no_print) {
        var matrix,
        max,
        buff,
        sep,
        rows
        matrix = this.getMatrix()
        max = reduce(matrix, 
        function(m, o) {
            return Math.max(m, reduce(o, Math.max, 0))

        },
        0)
        buff = Array((max + '').length).join(' ')

        sep = []
        while (sep.length < (matrix[0] && matrix[0].length || 0))
        sep[sep.length] = Array(buff.length + 1).join('-')
        sep = sep.join('-+') + '-'

        rows = map(matrix, 
        function(row) {
            var cells
            cells = map(row, 
            function(cell) {
                return (buff + cell).slice( - buff.length)

            })
            return cells.join(' |') + ' '

        })

        return rows.join("\n" + sep + "\n")

    }

    Levenshtein.prototype.getMatrix = function() {
        return this._matrix.slice()

    }

    Levenshtein.prototype.valueOf = function() {
        return this.distance

    }




    function calcSimilarity(source, target){

        try{
            var n = source.length,
                m = target.length;

            if (n === 0 || m === 0)
                return 0;
            var distance = new Levenshtein(source, target).distance;
            var max = Math.max(n, m);
            return (max - distance)/max;
        }catch(e){}
        
    }

    function matchSingle(baseField, matchFields){
        var mLen = matchFields.length,
            mi = 0,
            similaritys = [];
        for(mi=0;mi<mLen;mi++){
            var matchField = matchFields[mi],
                matchType = typeof matchFields;
            if(matchType==='string'){
                similaritys.push({
                    score: calcSimilarity(baseField, matchField),
                    matchField: matchField,
                    matchIndex: mi
                });
            }else if(matchType==='object'){
                var arr = [];
                for(var field in matchField){
                    arr.push({
                        score: calcSimilarity(baseField, matchField[field]),
                        field: field
                    });
                }
                arr.sort(function(l, r){
                    return l.score>=r.score ? -1 : 1;
                });
                var matchObj = arr[0];
                
                similaritys.push({
                    score: matchObj.score,
                    matchField: matchObj.field,
                    matchIndex: mi
                });
            }
        }
        similaritys.sort(function(l, r){
            return l.score>=r.score ? -1 : 1;
        });
        return similaritys;
    }

    function matchMuti(baseFields, matchFields){
        var bLen = baseFields.length,
            mLen = matchFields.length,
            bi = 0, mi = 0, matchMap=[];
        for(bi=0;bi<bLen;bi++){
            var baseField = baseFields[bi],
                baseType = typeof baseField;
            if(baseType==='string'){
                matchMap[baseField] = matchSingle(baseField, matchFields);
            }else if(baseType==='object'){
                var arr = [];
                for(var name in baseField){
                    arr.push(matchSingle(baseField[name], matchFields));
                }
                arr.sort(function(l, r){
                    return l.score>r.score ? -1 : 1;
                });
                //matchMap[] = arr[0];
            }
            
        }
        return matchMap;
    }

    return {
        matchSingle: matchSingle,
        matchMuti: matchMuti
    }
});

