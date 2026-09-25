// word.js - 単語データおよびローカルストレージ・成績集計管理ロジック

const DEFAULT_WORDS = [

    
    {
        id: 1001,
        word: "propose",
        meaning: "~を提案する,申し込む",
        examples: [
            { id: 10011, sentence: "[propose] a new program", translation: "新しい計画を提案する", correctCount: 0, incorrectCount: 0 },
            { id: 10012, sentence: "get down on my knee to [propose] to her", translation: "片膝ついて彼女にプロポーズする", correctCount: 0, incorrectCount: 0 }
        ]
    },
    {
        id: 1002,
        word: "dismiss",
        meaning: "~を避ける,~を解雇する",
        examples: [
            { id: 10021, sentence: "[dismiss] his proposal as unrealistic", translation: "非現実として彼の提案を退ける", correctCount: 0, incorrectCount: 0 },
            { id: 10022, sentence: "[dismiss] the employees", translation: "従業員を解雇する", correctCount: 0, incorrectCount: 0 }
        ]
    },
    {
        id: 1003,
        word: "bless",
        meaning: "~を祝福する",
        examples: [
            { id: 10031, sentence: "(God) [bless] you", translation: "お大事に", correctCount: 0, incorrectCount: 0 }
        ]
    },
    {
        id: 1004,
        word: "glory",
        meaning: "栄光",
        examples: [
            { id: 10041, sentence: "his [glory] days as a college basketball star", translation: "大学バスケットボールのスター選手としての彼の栄光の日々", correctCount: 0, incorrectCount: 0 }
        ]
    },
    {
        id: 1005,
        word: "compliment",
        meaning: "褒め言葉,~を褒める",
        examples: [
            { id: 10051, sentence: "[compliment]s on his shoes", translation: "彼の靴への褒め言葉", correctCount: 0, incorrectCount: 0 },
            { id: 10052, sentence: "[compliment] her on her new hairstyle", translation: "新しい髪型について彼女を褒める", correctCount: 0, incorrectCount: 0 }
        ]
    },
    {
        id: 1006,
        word: "feast",
        meaning: "宴会,とても楽しいこと,喜ばせるもの",
        examples: [
            { id: 10061, sentence: "the wedding [feast]", translation: "結婚式の宴", correctCount: 0, incorrectCount: 0 },
            { id: 10061, sentence: "This movie festival is a [feast] for cinema-goers .", translation: "この映画祭は映画好きにはたまらない.", correctCount: 0, incorrectCount: 0 }
        ]
    },
    {
        id: 1007,
        word: "declare",
        meaning: "~を宣言する,~を申告する",
        examples: [
            { id: 10071, sentence: "He [declared] that he was innocent.", translation: "彼は無実だとはっきり述べた", correctCount: 0, incorrectCount: 0 },
            { id: 10072, sentence: "[Do you have anything to declare?]", translation: "申告するものはありますか.", correctCount: 0, incorrectCount: 0 }
        ]
    },
    {
        id: 1008,
        word: "highlight",
        meaning: "強調する,呼び物,見どころ",
        examples: [
            { id: 10081, sentence: "[highlight] the issue of global warming", translation: "地球温暖化の問題を強調する", correctCount: 0, incorrectCount: 0 },
            { id: 10082, sentence: "the [highlight] of the show", translation: "そのショーの見所", correctCount: 0, incorrectCount: 0 }
        ]
    },
    {
        id: 1009,
        word: "imply",
        meaning: "~をほのめかす,~を意味する",
        examples: [
            { id: 10091, sentence: "Alex [implied] that he would resign.", translation: "アレックスは辞意をほのめかした", correctCount: 0, incorrectCount: 0 }
        ]
    },
    {
        id: 1010,
        word: "recite",
        meaning: "~を暗証する",
        examples: [
            { id: 10101, sentence: "[recite] a poem", translation: "詩を暗証する", correctCount: 0, incorrectCount: 0 }
        ]
    },
    {
        id: 1011,
        word: "ray",
        meaning: "光線,放射線,わずかな",
        examples: [
            { id: 10111, sentence: "the sun's [rays]", translation: "太陽光線", correctCount: 0, incorrectCount: 0 },
            { id: 10112, sentence: "take an X-[ray] (examination)", translation: "レントゲン(Ｘ線)検査を受ける", correctCount: 0, incorrectCount: 0 },
            { id: 10113, sentence: "a [rays] of hope", translation: "一縷の望み", correctCount: 0, incorrectCount: 0 }
        ]
    },
    {
        id: 1012,
        word: "radiation",
        meaning: "放射線",
        examples: [
            { id: 10121, sentence: "The workers were exposed to [radiation].", translation: "その労働者たちは被爆した(放射線にさらされた).", correctCount: 0, incorrectCount: 0 },
        ]
    },
    {
        id: 1013,
        word: "laboratory",
        meaning: "研究室",
        examples: [
            { id: 10131, sentence: "[laboratory] experiments", translation: "研究室での実験", correctCount: 0, incorrectCount: 0 },
        ]
    },
    {
        id: 1014,
        word: "oxygen",
        meaning: "酸素",
        examples: [
            { id:10141, sentence: "Water is made up of oxygen and [hydrogen].", translation: "水は酸素と水素からできている.", correctCount: 0, incorrectCount: 0 },
        ]
    },
    {
        id: 1015,
        word: "molecule",
        meaning: "分子",
        examples: [
            { id: 10151, sentence: "a [water] molecule", translation: "水分子", correctCount: 0, incorrectCount: 0 },
        ]
    },
    {
        id: 1016,
        word: "compound",
        meaning: "化合物,複合的な",
        examples: [
            { id: 1, sentence: "a chemical [compound]", translation: "化合物", correctCount: 0, incorrectCount: 0 },
            { id: 2, sentence: "`Duty-free' is a [compound] word.", translation: "「免税の」は複合語だ.", correctCount: 0, incorrectCount: 0 }
        ]
    },
    {
        id: 1017,
        word: "tissue",
        meaning: "組織,ティッシュ",
        examples: [
            { id: 10171, sentence: "nerve [tissue]", translation: "神経組織", correctCount: 0, incorrectCount: 0 },
            { id: 10172, sentence: "take a [tissue]", translation: "ティッシュペーパーを取る", correctCount: 0, incorrectCount: 0 }
        ]
    },
    {
        id: 1018,
        word: "cell",
        meaning: "細胞,電池,独房",
        examples: [
            { id: 10181, sentence: "remove the cancerous [cells]", translation: "がん細胞を除去する", correctCount: 0, incorrectCount: 0 },
            { id: 10182, sentence: "a fuel [cell]", translation: "燃料電池", correctCount: 0, incorrectCount: 0 },
            { id: 10183, sentence: "spend a week in a [cell]", translation: "独房で1週間過ごす", correctCount: 0, incorrectCount: 0 }
        ]
    },
    {
        id: 1019,
        word: "gene",
        meaning: "遺伝子",
        examples: [
            { id: 10191, sentence: "the [gene] for black hair", translation: "黒い髪の遺伝子", correctCount: 0, incorrectCount: 0 }
        ]
    },
    {
        id: 1020,
        word: "substance",
        meaning: "物質,本質,根拠",
        examples: [
            { id: 10201, sentence: "a cancer-causing [substance]", translation: "発がん性物質", correctCount: 0, incorrectCount: 0 },
            { id: 10202, sentence: "a rumor with no [substance]", translation: "根拠のないうわさ", correctCount: 0, incorrectCount: 0 }
        ]
    },
    {
        id: 1021,
        word: "solid",
        meaning: "固体,ぎっしり詰まった,純金",
        examples: [
            { id: 10211, sentence: "solid [fuel]", translation: "固体燃料", correctCount: 0, incorrectCount: 0 },
            { id: 10212, sentence: "solid [gold]", translation: "純金(ぎっしり詰まった金)", correctCount: 0, incorrectCount: 0 },
            { id: 10213, sentence: "change from solids to liquids", translation: "固体から液体に変化する", correctCount: 0, incorrectCount: 0 }
        ]
    },
    {
        id: 1022,
        word: "satellite",
        meaning: "衛星,人造衛星",
        examples: [
            { id: 10221, sentence: "the moon's [orbit] around the earth", translation: "地球を回る月の軌道", correctCount: 0, incorrectCount: 0 },
            { id: 10222, sentence: "the earth takes one year to [orbit] the sun.", translation: "地球は太陽の周りを1年で1周する.", correctCount: 0, incorrectCount: 0 }
        ]
    },
    {
        id: 1023,
        word: "orbit",
        meaning: "軌道,惑星などが~を周回する",
        examples: [
            { id: 10231, sentence: "Jupiter's sixth [satellite]", translation: "木星の6番目の衛星", correctCount: 0, incorrectCount: 0 },
            { id: 10232, sentence: "a communications [satellite]", translation: "通信衛星", correctCount: 0, incorrectCount: 0 }
        ]
    },
    {
        id: 1024,
        word: "launch",
        meaning: "打ち上げ,開始,発売,~を打ち上げる,始める",
        examples: [
            { id: 10241, sentence: "launch a Sun probe", translation: "太陽探査機を打ち上げる", correctCount: 0, incorrectCount: 0 },
            { id: 10242, sentence: "launch a campaign against smoking", translation: "禁煙運動を始める", correctCount: 0, incorrectCount: 0 },
            { id: 10243, sentence: "the launch of a new product", translation: "新製品の発売", correctCount: 0, incorrectCount: 0 }
        ]
    },
    {
        id: 1025,
        word: "attempt",
        meaning: "試み,~を試みる",
        examples: [
            { id: 10251, sentence: "make an [attempt] to break his record", translation: "彼の記録を破ろうと試みる", correctCount: 0, incorrectCount: 0 },
            { id: 10252, sentence: "attempt to escape", translation: "逃げようと試みる", correctCount: 0, incorrectCount: 0 }
        ]
    },
    {
        id: 1026,
        word: "capacity",
        meaning: "容量,収容力,能力",
        examples: [
            { id: 10261, sentence: "have a remarkable [capacity] to learn language", translation: "目立った言語学習能力を有している", correctCount: 0, incorrectCount: 0 },
            { id: 10262, sentence: "be packed to [capacity]", translation: "超満員(収容力いっぱい)で", correctCount: 0, incorrectCount: 0 },
            { id: 10263, sentence: "This factory is [capable] of producing 100 cars per hour.", translation: "この工場では1時間に100台の車を生産できる.", correctCount: 0, incorrectCount: 0 }
        ]
    },
    {
        id: 1027,
        word: "capable",
        meaning: "能力がある,有能な",
        examples: [
            { id: 10271, sentence: "a capable attorney", translation: "有能な弁護士", correctCount: 0, incorrectCount: 0 }
        ]
    },
    {
        id: 1028,
        word: "attain",
        meaning: "~を達成する,到達する",
        examples: [
            { id: 10281, sentence: "I have [attained] my ideal weight.", translation: "私は理想とする体重に達した.", correctCount: 0, incorrectCount: 0 },
            { id: 10282, sentence: "attain the age of 18", translation: "18歳になる", correctCount: 0, incorrectCount: 0 }
        ]
    },
    {
        id: 1029,
        word: "desperate",
        meaning: "必死の,状況が絶望的な",
        examples: [
            { id: 10291, sentence: "make a [desperate] effort to succeed", translation: "成功するために必死の努力をする", correctCount: 0, incorrectCount: 0 },
            { id: 10292, sentence: "a desperate shortage of water", translation: "絶望的な水不足", correctCount: 0, incorrectCount: 0 }
        ]
    },
    {
        id: 1030,
        word: "dedicate",
        meaning: "~を捧げる",
        examples: [
            { id: 10301, sentence: "She [dedicated] herself to her work.", translation: "彼女は仕事に没頭した(仕事に自分自身を捧げた).", correctCount: 0, incorrectCount: 0 }
        ]
    },
    {
        id: 1031,
        word: "pain",
        meaning: "苦痛,苦労",
        examples: [
            { id: 10311, sentence: "Do you feel any [pain]?", translation: "医者の発言「痛みはありますか」", correctCount: 0, incorrectCount: 0 },
            { id: 10312, sentence: "take [pains] to improve my image", translation: "イメージアップに苦心する", correctCount: 0, incorrectCount: 0 }
        ]
    },
    {
        id: 1032,
        word: "strain",
        meaning: "心身の負担,無理,~を痛める,負担を強いる",
        examples: [
            { id: 10321, sentence: "work under a lot of [strain]", translation: "過度の負担の下で働く", correctCount: 0, incorrectCount: 0 },
            { id: 10322, sentence: "[strain] a muscle in my leg", translation: "足の筋肉を痛める", correctCount: 0, incorrectCount: 0 }
        ]
    },
    {
        id: 1033,
        word: "remedy",
        meaning: "治療法,治療薬,改善策,対策",
        examples: [
            { id: 10331, sentence: "a [remedy] for colds", translation: "かぜの治療法", correctCount: 0, incorrectCount: 0 },
            { id: 10332, sentence: "a remedy for unemployment", translation: "失業対策", correctCount: 0, incorrectCount: 0 }
        ]
    },
    {
        id: 1034,
        word: "pharmacy",
        meaning: "調剤局,薬局",
        examples: [
            { id: 10341, sentence: "buy medicine at a nearby [pharmacy]", translation: "近くの薬局で薬を買う", correctCount: 0, incorrectCount: 0 }
        ]
    },
    {
        id: 1035,
        word: "physician",
        meaning: "医師,内科医",
        examples: [
            { id: 10351, sentence: "emergency physicians", translation: "救急医", correctCount: 0, incorrectCount: 0 },
            { id: 10352, sentence: "the Royal college of Physicians", translation: "英国王立内科医協会", correctCount: 0, incorrectCount: 0 }
        ]
    },
    {
        id: 1036,
        word: "disorder",
        meaning: "心身の不調,精神疾患,消化不良など",
        examples: [
            { id: 10361, sentence: "eating [disorders]", translation: "摂食障害", correctCount: 0, incorrectCount: 0 }
        ]
    },
    {
        id: 1037,
        word: "pregnant",
        meaning: "妊娠した",
        examples: [
            { id: 10371, sentence: "Terry is three-months [pregnant].", translation: "テリーは妊娠3か月だ.", correctCount: 0, incorrectCount: 0 }
        ]
    },
    {
        id: 1038,
        word: "clinical",
        meaning: "臨床の",
        examples: [
            { id: 10381, sentence: "clinical test", translation: "臨床試験", correctCount: 0, incorrectCount: 0 }
        ]
    },
    {
        id: 1039,
        word: "heal",
        meaning: "~を治す,治る",
        examples: [
            { id: 10391, sentence: "[heal] people by laying my hands on their bodies", translation: "体に手を当てて人々を治す", correctCount: 0, incorrectCount: 0 },
            { id: 10392, sentence: "The injury will [heal] quickly.", translation: "傷はすぐに治るだろう.", correctCount: 0, incorrectCount: 0 }
        ]
    },
    {
        id: 1040,
        word: "infect",
        meaning: "人,動物,地域に感染させる,伝染する",
        examples: [
            { id: 10401, sentence: "My dog was [infected] with a virus.", translation: "うちのイヌはウイルスに感染させられた.", correctCount: 0, incorrectCount: 0 }
        ]
    },
    {
        id: 1041,
        word: "ankle",
        meaning: "足首",
        examples: [
            { id: 10411, sentence: "twist my [ankle]", translation: "足首をひねる", correctCount: 0, incorrectCount: 0 }
        ]
    },
    {
        id: 1042,
        word: "thumb",
        meaning: "親指",
        examples: [
            { id: 10421, sentence: "stick up my [thumb]", translation: "親指を立てる", correctCount: 0, incorrectCount: 0 }
        ]
    },
    {
        id: 1043,
        word: "forehead",
        meaning: "額,おでこ",
        examples: [
            { id: 10431, sentence: "I've got a [pimple] on my forehead.", translation: "(私のお)でこにニキビができてきた.", correctCount: 0, incorrectCount: 0 }
        ]
    },
    {
        id: 1044,
        word: "chin",
        meaning: "下あご,あごの先端",
        examples: [
            { id: 10441, sentence: "stick out my [chin]", translation: "あごを突き出す", correctCount: 0, incorrectCount: 0 }
        ]
    },
    {
        id: 1045,
        word: "chest",
        meaning: "胸,部,大きな木箱,密閉容器",
        examples: [
            { id: 10451, sentence: "have a [chest] X-ray examination", translation: "胸部のレントゲン検査を受ける", correctCount: 0, incorrectCount: 0 },
            { id: 10452, sentence: "a large wooden [chest]", translation: "大きな木製の箱", correctCount: 0, incorrectCount: 0 }
        ]
    },
    {
        id: 1046,
        word: "breast",
        meaning: "おもに女性の胸,乳房",
        examples: [
            { id: 10461, sentence: "early detection of [breast] cancer", translation: "乳がんの早期発見", correctCount: 0, incorrectCount: 0 }
        ]
    },
    {
        id: 1047,
        word: "lung",
        meaning: "肺",
        examples: [
            { id: 10471, sentence: "the heart and the [lungs]", translation: "(ヒトの)心臓と肺", correctCount: 0, incorrectCount: 0 }
        ]
    },
    {
        id: 1048,
        word: "organ",
        meaning: "臓器,動物の器官,楽器オルガン",
        examples: [
            { id: 10481, sentence: "wait for an [organ] transplant", translation: "臓器移植を待つ", correctCount: 0, incorrectCount: 0 },
            { id: 10482, sentence: "play the [organ]", translation: "オルガンを弾く", correctCount: 0, incorrectCount: 0 }
        ]
    },
    {
        id: 1049,
        word: "vision",
        meaning: "視力,視野,未来像,未来を見通す力,先見の明",
        examples: [
            { id: 10491, sentence: "have [good], [poor] [vision]", translation: "視力が良い(正常だ),悪い", correctCount: 0, incorrectCount: 0 },
            { id: 10492, sentence: "his [vision] for Japan's future", translation: "日本の未来の彼の予想図", correctCount: 0, incorrectCount: 0 },
            { id: 10493, sentence: "a leader with [vision]", translation: "先見の明のある指導者", correctCount: 0, incorrectCount: 0 }
        ]
    },
    {
        id: 1050,
        word: "skeleton",
        meaning: "骸骨,骨格",
        examples: [
            { id: 10501, sentence: "a model of the human [skeleton]", translation: "ヒトの骸骨の模型", correctCount: 0, incorrectCount: 0 }
        ]
    },
    {
        id: 1051,
        word: "sensation",
        meaning: "感覚,説明し難い感情",
        examples: [
            { id: 10511, sentence: "lose all [sensation] in my toes", translation: "足の指先の感覚がなくなる", correctCount: 0, incorrectCount: 0 },
            { id: 10512, sentence: "I had the [sensation] that I was being followed.", translation: "後をつけられているのではないかという気がした.", correctCount: 0, incorrectCount: 0 }
        ]
    },
    {
        id: 1052,
        word: "code",
        meaning: "服装などの規定,暗号,書かれたもの",
        examples: [
            { id: 10521, sentence: "Does the restaurant have a dress [code]?", translation: "そのレストランには服装規定はありますか.", correctCount: 0, incorrectCount: 0 },
            { id: 10522, sentence: "write in [code]", translation: "暗号で書く", correctCount: 0, incorrectCount: 0 }
        ]
    },
    {
        id: 1053,
        word: "agenda",
        meaning: "協議事項,会議などの議題一覧",
        examples: [
            { id: 10531, sentence: "the [agenda] for today's meeting", translation: "本日の会議の議題", correctCount: 0, incorrectCount: 0 }
        ]
    },
    {
        id: 1054,
        word: "liberty",
        meaning: "自由",
        examples: [
            { id: 10541, sentence: "fight for [liberty] and equality", translation: "自由と平等のために戦う", correctCount: 0, incorrectCount: 0 }
        ]
    },
    {
        id: 1055,
        word: "committee",
        meaning: "委員会",
        examples: [
            { id: 10551, sentence: "the International Olympic [Committee]", translation: "国際オリンピック委員会", correctCount: 0, incorrectCount: 0 }
        ]
    },
    {
        id: 1056,
        word: "humanity",
        meaning: "人類,人類愛,文系の人文科学,人間性あふれる教師",
        examples: [
            { id: 10561, sentence: "a crime against [humanity]", translation: "人類に対する犯罪", correctCount: 0, incorrectCount: 0 },
            { id: 10562, sentence: "a student of the [humanities]", translation: "文系の学生", correctCount: 0, incorrectCount: 0 },
            { id: 10563, sentence: "a teacher of deep [humanity]", translation: "人間性あふれる教師", correctCount: 0, incorrectCount: 0 }
        ]
    },
    {
        id: 1057,
        word: "mankind",
        meaning: "集合的に人類",
        examples: [
            { id: 10571, sentence: "in the history of [mankind]", translation: "人類の歴史において", correctCount: 0, incorrectCount: 0 }
        ]
    },
    {
        id: 1058,
        word: "authority",
        meaning: "権威,権力,当局",
        examples: [
            { id: 10581, sentence: "an [authority] on orthodontics", translation: "歯科矯正学の権威", correctCount: 0, incorrectCount: 0 },
            { id: 10582, sentence: "someone in [authority]", translation: "権力のある人", correctCount: 0, incorrectCount: 0 },
            { id: 10583, sentence: "the school [authorities]", translation: "学校当局", correctCount: 0, incorrectCount: 0 }
        ]
    },
    {
        id: 1059,
        word: "justice",
        meaning: "正義,公平で道徳的,法的に正しいこと",
        examples: [
            { id: 10591, sentence: "have a strong sense of [justice]", translation: "正義感が強い", correctCount: 0, incorrectCount: 0 }
        ]
    },
    {
        id: 1060,
        word: "insurance",
        meaning: "保険",
        examples: [
            { id: 10601, sentence: "have [health] [insurance]", translation: "健康保険に入っている[入る]", correctCount: 0, incorrectCount: 0 }
        ]
    },
    {
        id: 1061,
        word: "hardship",
        meaning: "主に経済的苦難",
        examples: [
            { id: 10611, sentence: "suffer financial [hardship]", translation: "お金で苦労する(経済的苦難に苦しむ)", correctCount: 0, incorrectCount: 0 }
        ]
    },
    {
        id: 1062,
        word: "poverty",
        meaning: "貧困",
        examples: [
            { id: 10621, sentence: "live below the [poverty] line", translation: "最低(貧困)水準以下の暮らしをする", correctCount: 0, incorrectCount: 0 }
        ]
    },
    {
        id: 1063,
        word: "chaos",
        meaning: "大混乱,混沌",
        examples: [
            { id: 10631, sentence: "The kitchen is in [chaos].", translation: "台所がめちゃくちゃだ(大混乱だ).", correctCount: 0, incorrectCount: 0 }
        ]
    },
    {
        id: 1064,
        word: "isolation",
        meaning: "孤立,分離,孤独感",
        examples: [
            { id: 10641, sentence: "in [isolation] from society", translation: "社会から孤立して", correctCount: 0, incorrectCount: 0 }
        ]
    },
    {
        id: 1065,
        word: "region",
        meaning: "地域",
        examples: [
            { id: 10651, sentence: "a wine-producing [region]", translation: "ワインの生産地域", correctCount: 0, incorrectCount: 0 }
        ]
    },
    {
        id: 1066,
        word: "proof",
        meaning: "証拠,証明",
        examples: [
            { id: 10661, sentence: "There is no [proof] that she was at home at that time.", translation: "彼女がその時家ににいたという証拠はない.", correctCount: 0, incorrectCount: 0 },
            { id: 10662, sentence: "a waterproof watch", translation: "防水の腕時計", correctCount: 0, incorrectCount: 0 }
        ]
    },
    {
        id: 1067,
        word: "warranty",
        meaning: "保証",
        examples: [
            { id: 10671, sentence: "My microwave oven was under [warranty], so the repair was free.", translation: "私の電子レンジは保証期間中だったので,修理は無料だった.", correctCount: 0, incorrectCount: 0 }
        ]
    },
    {
        id: 1068,
        word: "principle",
        meaning: "原理,原則,主義,信念",
        examples: [
            { id: 10681, sentence: "in [principle]", translation: "原則的には", correctCount: 0, incorrectCount: 0 },
            { id: 10682, sentence: "a guiding [principle] in my life", translation: "人生の指針となる信念", correctCount: 0, incorrectCount: 0 }
        ]
    },
    {
        id: 1069,
        word: "origin",
        meaning: "起源",
        examples: [
            { id: 10691, sentence: "the [origin] of life on Earth", translation: "地球上の生命の起源", correctCount: 0, incorrectCount: 0 }
        ]
    },
    {
        id: 1070,
        word: "setting",
        meaning: "環境,状況,小説などの設定,舞台",
        examples: [
            { id: 10701, sentence: "a perfect [setting] for a picnic", translation: "ピクニックにはうってつけの環境", correctCount: 0, incorrectCount: 0 },
            { id: 10702, sentence: "the [setting] for the novel", translation: "その小説の舞台", correctCount: 0, incorrectCount: 0 }
        ]
    },
    {
        id: 1071,
        word: "mission",
        meaning: "任務,使命,使節団",
        examples: [
            { id: 10711, sentence: "a [mission] to Saturn", translation: "土星への(飛行)任務", correctCount: 0, incorrectCount: 0 },
            { id: 10712, sentence: "dispatch a mission to North Korea", translation: "北朝鮮へ使節団を派遣する", correctCount: 0, incorrectCount: 0 },
            { id: 10713, sentence: "a Christian [mission]", translation: "キリスト教の布教", correctCount: 0, incorrectCount: 0 }
        ]
    },
    {
        id: 1072,
        word: "project",
        meaning: "計画,企画,予算などを見積もる,を投影する",
        examples: [
            { id: 10721, sentence: "the outline of the new [project]", translation: "新企画の概要", correctCount: 0, incorrectCount: 0 },
            { id: 10722, sentence: "The cost was [projected] to be 100 million dollars.", translation: "費用は1億円と見積もられた.", correctCount: 0, incorrectCount: 0 },
            { id: 10723, sentence: "be [projected] onto a big screen", translation: "大きなスクリーンに映し出される", correctCount: 0, incorrectCount: 0 }
        ]
    },
    {
        id: 1073,
        word: "monument",
        meaning: "記念碑,遺跡,史跡",
        examples: [
            { id: 10731, sentence: "put up a [monument]", translation: "記念碑を建てる", correctCount: 0, incorrectCount: 0 }
        ]
    },
    {
        id: 1074,
        word: "revolution",
        meaning: "革命",
        examples: [
            { id: 10741, sentence: "a [revolution] in health care", translation: "医療の改革", correctCount: 0, incorrectCount: 0 }
        ]
    },
    {
        id: 1075,
        word: "contract",
        meaning: "契約,~を契約する,病気に感染する",
        examples: [
            { id: 10751, sentence: "sign a [contract] with the team", translation: "そのチームと契約をする", correctCount: 0, incorrectCount: 0 },
            { id: 10752, sentence: "contract a loan", translation: "ローンを契約する", correctCount: 0, incorrectCount: 0 },
            { id: 10753, sentence: "contract a killer virus", translation: "致死ウイルスに感染する", correctCount: 0, incorrectCount: 0 }
        ]
    },
    {
        id: 1076,
        word: "infrastructure",
        meaning: "インフラ,基幹施設",
        examples: [
            { id: 10761, sentence: "improve the tourism [infrastructure]", translation: "観光インフラを整備する", correctCount: 0, incorrectCount: 0 }
        ]
    },
    {
        id: 1077,
        word: "negotiate",
        meaning: "~と交渉する",
        examples: [
            { id: 10771, sentence: "[negotiate] with kidnappers", translation: "誘拐犯と交渉する", correctCount: 0, incorrectCount: 0 },
            { id: 10772, sentence: "negotiate a trade agreement", translation: "貿易協定を取り決める", correctCount: 0, incorrectCount: 0 }
        ]
    },
    {
        id: 1078,
        word: "cooperate",
        meaning: "~と協力する",
        examples: [
            { id: 10781, sentence: "We all [cooperated] in preparing for the cultural festival.", translation: "私たち全員で協力して文化祭の準備をした.", correctCount: 0, incorrectCount: 0 }
        ]
    },
    {
        id: 1079,
        word: "restore",
        meaning: "治安などを回復する,古い建物,絵などを修理する",
        examples: [
            { id: 10791, sentence: "[restore] peace in the Middle East", translation: "中東で平和を回復する", correctCount: 0, incorrectCount: 0 },
            { id: 10792, sentence: "[restore] the old church", translation: "その古い教会を修復する", correctCount: 0, incorrectCount: 0 }
        ]
    },
    {
        id: 1080,
        word: "found",
        meaning: "~を創立する",
        examples: [
            { id: 10801, sentence: "Our school was [founded] in 1918.", translation: "我が校は1918年に創立された.", correctCount: 0, incorrectCount: 0 }
        ]
    },
    {
        id: 1081,
        word: "conservative",
        meaning: "保守的な",
        examples: [
            { id: 10811, sentence: "the Conservative Party", translation: "保守党", correctCount: 0, incorrectCount: 0 }
        ]
    },
    {
        id: 1082,
        word: "affair",
        meaning: "事柄,情勢,スキャンダラスな事件,情事,浮気",
        examples: [
            { id: 10821, sentence: "international [affairs]", translation: "国際情勢", correctCount: 0, incorrectCount: 0 },
            { id: 10822, sentence: "the spy [affair]", translation: "スパイ事件", correctCount: 0, incorrectCount: 0 },
            { id: 10823, sentence: "a triangular love [affair]", translation: "男女の三角関係(三角形の情事)", correctCount: 0, incorrectCount: 0 }
        ]
    },
    {
        id: 1083,
        word: "agency",
        meaning: "政府機関,代理店",
        examples: [
            { id: 10831, sentence: "the Central Intelligence Agency (CIA)", translation: "アメリカ中央情報局(CIA)", correctCount: 0, incorrectCount: 0 },
            { id: 10832, sentence: "a travel [agency]", translation: "旅行代理店", correctCount: 0, incorrectCount: 0 }
        ]
    },
    {
        id: 1084,
        word: "council",
        meaning: "議会",
        examples: [
            { id: 10841, sentence: "the city [council]", translation: "市議会", correctCount: 0, incorrectCount: 0 }
        ]
    },
    {
        id: 1085,
        word: "kingdom",
        meaning: "王国,社会",
        examples: [
            { id: 10851, sentence: "the animal [kingdom]", translation: "動物界", correctCount: 0, incorrectCount: 0 },
            { id: 10852, sentence: "the United Kingdom", translation: "連合王国(=英国)", correctCount: 0, incorrectCount: 0 }
        ]
    },
    {
        id: 1086,
        word: "republic",
        meaning: "共和国",
        examples: [
            { id: 10861, sentence: "the People's Republic of China", translation: "中華人民共和国", correctCount: 0, incorrectCount: 0 }
        ]
    },
    {
        id: 1087,
        word: "empire",
        meaning: "帝国",
        examples: [
            { id: 10871, sentence: "the fall of the Roman Empire", translation: "ローマ帝国の崩壊", correctCount: 0, incorrectCount: 0 }
        ]
    },
    {
        id: 1088,
        word: "aid",
        meaning: "援助,救援物資",
        examples: [
            { id: 10881, sentence: "give economic [aid] to developing countries", translation: "発展途上国へ経済援助を行う", correctCount: 0, incorrectCount: 0 }
        ]
    },
    {
        id: 1089,
        word: "reform",
        meaning: "改革,~を改革する",
        examples: [
            { id: 10891, sentence: "the government's educational [reform](s)", translation: "政府の教育改革", correctCount: 0, incorrectCount: 0 }
        ]
    },
    {
        id: 1090,
        word: "minister",
        meaning: "大臣,牧師",
        examples: [
            { id: 10901, sentence: "the foreign [minister]", translation: "外務大臣", correctCount: 0, incorrectCount: 0 },
            { id: 10902, sentence: "a Baptist minister", translation: "バプテスト派の牧師", correctCount: 0, incorrectCount: 0 }
        ]
    },
    {
        id: 1091,
        word: "parliament",
        meaning: "議会",
        examples: [
            { id: 10911, sentence: "summon [dissolve] a parliament", translation: "議会を招集する[解散する]", correctCount: 0, incorrectCount: 0 }
        ]
    },
    {
        id: 1092,
        word: "territory",
        meaning: "領土,動物などの縄張り,学問などの領域",
        examples: [
            { id: 10921, sentence: "the issue of the Northern [Territories]", translation: "北方領土問題", correctCount: 0, incorrectCount: 0 },
            { id: 10922, sentence: "Dogs use urine to mark their [territory].", translation: "イヌはオシッコをすることで自分の縄張りを示す.", correctCount: 0, incorrectCount: 0 }
        ]
    },
    {
        id: 1093,
        word: "poll",
        meaning: "政治関連の世論調査,投票,~票を得る",
        examples: [
            { id: 10931, sentence: "recent opinion [polls]", translation: "最近の世論調査", correctCount: 0, incorrectCount: 0 },
            { id: 10932, sentence: "go to the [polls]", translation: "投票に行く", correctCount: 0, incorrectCount: 0 },
            { id: 10933, sentence: "poll 30,000 votes", translation: "3万票を獲得する", correctCount: 0, incorrectCount: 0 }
        ]
    },
    {
        id: 1094,
        word: "fortune",
        meaning: "財産,幸運",
        examples: [
            { id: 10941, sentence: "make a [fortune] in real estate", translation: "不動産で財産を作る", correctCount: 0, incorrectCount: 0 },
            { id: 10942, sentence: "tell his [fortune] with playing cards", translation: "トランプで彼の運勢を占う", correctCount: 0, incorrectCount: 0 }
        ]
    },
    {
        id: 1095,
        word: "property",
        meaning: "財産,資産,物質の特性,建物を含む",
        examples: [
            { id: 10951, sentence: "intellectual [property]", translation: "知的財産", correctCount: 0, incorrectCount: 0 },
            { id: 10952, sentence: "the [property] of dissolving in water", translation: "水に溶ける特性", correctCount: 0, incorrectCount: 0 },
            { id: 10953, sentence: "a fence marking the property's boundaries", translation: "所有地の境界を示す塀", correctCount: 0, incorrectCount: 0 }
        ]
    },
    {
        id: 1096,
        word: "fund",
        meaning: "資金,基金,~に資金を出す",
        examples: [
            { id: 10961, sentence: "manage [funds] effectively", translation: "資金を有効に活用する", correctCount: 0, incorrectCount: 0 },
            { id: 10962, sentence: "the International Monetary Fund", translation: "国際通貨基金(IMF)", correctCount: 0, incorrectCount: 0 }
        ]
    },
    {
        id: 1097,
        word: "budget",
        meaning: "予算,~を予算に計上する",
        examples: [
            { id: 10971, sentence: "a tight [budget]", translation: "厳しい予算", correctCount: 0, incorrectCount: 0 }
        ]
    },
    {
        id: 1098,
        word: "profit",
        meaning: "利益,儲け,~に利益をもたらす",
        examples: [
            { id: 10981, sentence: "make a [profit]", translation: "利益を上げる", correctCount: 0, incorrectCount: 0 }
        ]
    },
    {
        id: 1099,
        word: "tax",
        meaning: "税金,~に税金を課す",
        examples: [
            { id: 10991, sentence: "pay income [tax]", translation: "所得税を払う", correctCount: 0, incorrectCount: 0 }
        ]
    },
    {
        id: 1100,
        word: "pension",
        meaning: "年金",
        examples: [
            { id: 11001, sentence: "receive a national [pension]", translation: "国民年金を受け取る", correctCount: 0, incorrectCount: 0 }
        ]
    }

    
];

class WordManager {
    constructor() {
        this.storageKey = 'vocab_app_data_11'; // バージョンキー更新
        this.words = this.loadData();
    }

    loadData() {
        const saved = localStorage.getItem(this.storageKey);
        let data = DEFAULT_WORDS;
        if (saved) {
            try {
                const parsed = JSON.parse(saved);
                if (Array.isArray(parsed) && parsed.length > 0) {
                    data = parsed;
                }
            } catch (e) {
                console.error("Failed to parse localStorage", e);
            }
        }
        // ID順にソートして返す
        return data.sort((a, b) => a.id - b.id);
    }

    saveData() {
        // 保存時もID順に並び替える
        this.words.sort((a, b) => a.id - b.id);
        localStorage.setItem(this.storageKey, JSON.stringify(this.words));
    }

    getWords() {
        return this.words;
    }

    addWord(wordData) {
        const maxId = this.words.length > 0 ? Math.max(...this.words.map(w => w.id)) : 1000;
        wordData.id = maxId >= 1000 ? maxId + 1 : 1001;
        
        wordData.examples = wordData.examples.map((ex, index) => ({
            id: wordData.id * 10 + (index + 1),
            sentence: ex.sentence,
            translation: ex.translation,
            correctCount: 0,
            incorrectCount: 0
        }));

        this.words.push(wordData);
        this.saveData();
    }

    updateWord(id, updatedData) {
        const index = this.words.findIndex(w => w.id === id);
        if (index !== -1) {
            updatedData.examples = updatedData.examples.map((ex, i) => {
                const oldWord = this.words[index];
                const matchedOldEx = oldWord.examples && oldWord.examples[i];
                return {
                    id: matchedOldEx ? matchedOldEx.id : updatedData.id * 10 + (i + 1),
                    sentence: ex.sentence,
                    translation: ex.translation,
                    correctCount: matchedOldEx ? matchedOldEx.correctCount : 0,
                    incorrectCount: matchedOldEx ? matchedOldEx.incorrectCount : 0
                };
            });
            this.words[index] = updatedData;
            this.saveData();
        }
    }

    deleteWord(id) {
        this.words = this.words.filter(w => w.id !== id);
        this.saveData();
    }

    updateStats(exampleId, isCorrect) {
        for (let word of this.words) {
            if (!word.examples) continue;
            for (let ex of word.examples) {
                if (ex.id === exampleId) {
                    if (isCorrect) {
                        ex.correctCount = (ex.correctCount || 0) + 1;
                    } else {
                        ex.incorrectCount = (ex.incorrectCount || 0) + 1;
                    }
                    this.saveData();
                    return;
                }
            }
        }
    }

    resetAllStats() {
        for (let word of this.words) {
            if (!word.examples) continue;
            for (let ex of word.examples) {
                ex.correctCount = 0;
                ex.incorrectCount = 0;
            }
        }
        this.saveData();
    }

    getAnalytics() {
        let totalQuestions = 0;
        let totalCorrect = 0;
        let totalIncorrect = 0;
        let masteredExamples = 0;
        let learningExamples = 0;
        let unattemptedExamples = 0;

        this.words.forEach(w => {
            if (!w.examples) return;
            w.examples.forEach(ex => {
                const c = ex.correctCount || 0;
                const inc = ex.incorrectCount || 0;
                const total = c + inc;
                totalCorrect += c;
                totalIncorrect += inc;
                totalQuestions += total;

                if (total === 0) {
                    unattemptedExamples++;
                } else if (c / total >= 0.8 && c >= 3) {
                    masteredExamples++;
                } else {
                    learningExamples++;
                }
            });
        });

        const overallRate = totalQuestions > 0 ? Math.round((totalCorrect / totalQuestions) * 100) : 0;

        return {
            totalQuestions,
            totalCorrect,
            totalIncorrect,
            overallRate,
            masteredExamples,
            learningExamples,
            unattemptedExamples,
            totalExamplesCount: masteredExamples + learningExamples + unattemptedExamples
        };
    }
}

window.wordManager = new WordManager();
