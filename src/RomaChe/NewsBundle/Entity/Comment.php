<?php

namespace RomaChe\NewsBundle\Entity;

use Doctrine\ORM\Mapping as ORM;
use RomaChe\AuthBundle\Helpers\ChmodInterface;

/**
 * Comment
 *
 * @ORM\Table(name="comment")
 * @ORM\Entity(repositoryClass="RomaChe\NewsBundle\Repository\CommentRepository")
 */
class Comment implements ChmodInterface
{
    public function __construct()
    {
        $this->createdAt = new \DateTime();
        $this->type = 'COMMENT';
    }
    /**
     * @var int
     *
     * @ORM\Column(name="id", type="integer")
     * @ORM\Id
     * @ORM\GeneratedValue(strategy="AUTO")
     */
    private $id;

    /**
     * @var string
     *
     * @ORM\Column(name="type", type="string", length=255)
     */
    private $type;

    /**
     * @var string
     *
     * @ORM\Column(name="title", type="string", length=255)
     */
    private $title;

    /**
     * @var string
     *
     * @ORM\Column(name="commect", type="text")
     */
    private $commect;

    /**
     * @var \DateTime
     *
     * @ORM\Column(name="createdAt", type="datetime")
     */
    private $createdAt;

    /**
     * One Product has One Shipment.
     * @ORM\OneToOne(targetEntity="Chmod")
     * @ORM\JoinColumn(name="chmod_id", referencedColumnName="id")
     */
    private $chmod;

    /**
     * @var \Section
     *
     * @ORM\ManyToOne(targetEntity="News", inversedBy="comments")
     * @ORM\JoinColumns({
     *   @ORM\JoinColumn(name="news_id", referencedColumnName="id")
     * })
     */
    private $news;



    /**
     * Get id
     *
     * @return int
     */
    public function getId()
    {
        return $this->id;
    }

    /**
     * Set title
     *
     * @param string $title
     *
     * @return Comment
     */
    public function setTitle($title)
    {
        $this->title = $title;

        return $this;
    }

    /**
     * Get title
     *
     * @return string
     */
    public function getTitle()
    {
        return $this->title;
    }

    /**
     * Set commect
     *
     * @param string $commect
     *
     * @return Comment
     */
    public function setCommect($commect)
    {
        $this->commect = $commect;

        return $this;
    }

    /**
     * Get commect
     *
     * @return string
     */
    public function getCommect()
    {
        return $this->commect;
    }

    /**
     * Set createdAt
     *
     * @param \DateTime $createdAt
     *
     * @return Comment
     */
    public function setCreatedAt($createdAt)
    {
        $this->createdAt = $createdAt;

        return $this;
    }

    /**
     * Get createdAt
     *
     * @return \DateTime
     */
    public function getCreatedAt()
    {
        return $this->createdAt;
    }

    /**
     * Set chmod
     *
     * @param \RomaChe\NewsBundle\Entity\Chmod $chmod
     *
     * @return Comment
     */
    public function setChmod(\RomaChe\NewsBundle\Entity\Chmod $chmod = null)
    {
        $this->chmod = $chmod;

        return $this;
    }

    /**
     * Get chmod
     *
     * @return \RomaChe\NewsBundle\Entity\Chmod
     */
    public function getChmod()
    {
        return $this->chmod;
    }

    /**
     * Set type
     *
     * @param string $type
     *
     * @return Comment
     */
    public function setType($type)
    {
        $this->type = $type;

        return $this;
    }

    /**
     * Get type
     *
     * @return string
     */
    public function getType()
    {
        return $this->type;
    }

    /**
     * Set news
     *
     * @param \RomaChe\NewsBundle\Entity\News $news
     *
     * @return Comment
     */
    public function setNews(\RomaChe\NewsBundle\Entity\News $news = null)
    {
        $this->news = $news;

        return $this;
    }

    /**
     * Get news
     *
     * @return \RomaChe\NewsBundle\Entity\News
     */
    public function getNews()
    {
        return $this->news;
    }
}
